import { mkdir, readFile, writeFile, realpath } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { sha, sourceDigest } from "./header-release.cjs";

const root = resolve(import.meta.dir, "..");
const source = resolve(root, "packages/site-header/src");
const output = resolve(root, "packages/site-header/lib");
const check = process.argv.includes("--check");
const sync = process.argv.includes("--sync-governance");
let vendor: string | undefined;

// Validate the destination before writing. A sibling can be an abandoned checkout.
if (sync) {
  const flag = process.argv.indexOf("--governance-root");
  let target = flag >= 0 ? process.argv[flag + 1] : process.env.INTERFOLD_GOVERNANCE_ROOT;
  if (flag >= 0 && (!target || target.startsWith("--")))
    throw new Error("--governance-root requires a Governance repository path");
  if (!target) {
    try {
      const config = JSON.parse(await readFile(resolve(root, ".interfold-design.local.json"), "utf8"));
      target = config.governanceRoot;
    } catch (error: any) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  if (typeof target !== "string" || !target.trim())
    throw new Error("Choose the active checkout: --governance-root PATH, INTERFOLD_GOVERNANCE_ROOT, or governanceRoot in .interfold-design.local.json");
  const governance = await realpath(resolve(root, target));
  const pkg = JSON.parse(await readFile(resolve(governance, "app/package.json"), "utf8"));
  if (pkg.name !== "CRISPVoting") throw new Error(`Not a Governance checkout: ${governance}`);
  await readFile(resolve(governance, "DESIGN.md"), "utf8");
  vendor = resolve(governance, "app/vendor/site-header");
  console.info(`[header] Governance destination: ${governance}`);
}

const result = await Bun.build({
  entrypoints: [resolve(source, "index.tsx"), resolve(source, "motion.tsx")],
  outdir: output,
  write: false,
  target: "browser",
  format: "esm",
  jsx: { development: false },
  external: ["react", "react/jsx-runtime", "react/jsx-dev-runtime", "framer-motion"],
});
if (!result.success) throw new AggregateError(result.logs, "Site header build failed");
const files = new Map<string, string>();
for (const artifact of result.outputs) files.set(basename(artifact.path), await artifact.text());
for (const [from, to] of [["styles.css", "styles.css"], ["types.d.ts", "index.d.ts"], ["motion.types.d.ts", "motion.d.ts"]])
  files.set(to, await readFile(resolve(source, from), "utf8"));
files.set("package.json", JSON.stringify({
  name: "@interfold/site-header", version: "1.0.0", private: true,
  type: "module", main: "index.js", types: "index.d.ts",
  peerDependencies: { react: "^18.2.0", "framer-motion": "^11.18.2 || ^12.23.24" },
}, null, 2) + "\n");

async function distribute(directory: string, release: Map<string, string>) {
  for (const [name, content] of release) {
    const destination = resolve(directory, name);
    let previous: string | undefined;
    try { previous = await readFile(destination, "utf8"); }
    catch (error: any) { if (error.code !== "ENOENT") throw error; }
    if (previous === content) continue;
    if (check) throw new Error(`Stale shared header: ${destination}. Run bun run sync:header.`);
    await mkdir(directory, { recursive: true });
    await writeFile(destination, content);
  }
}
const symbolAssets = new Map([["interfold-symbol-fold.svg", await readFile(resolve(root, "packages/site-header/assets/symbol-fold.svg"), "utf8")]]);
files.set("verify.cjs", await readFile(resolve(root, "scripts/header-release.cjs"), "utf8"));
files.set("manifest.json", JSON.stringify({
  sourceSha256: sourceDigest(resolve(root, "packages/site-header")),
  files: Object.fromEntries([...files].map(([name, content]) => [name, sha(content)])),
  assets: Object.fromEntries([...symbolAssets].map(([name, content]) => [name, sha(content)])),
}, null, 2) + "\n");
await distribute(output, files);
await distribute(resolve(root, "public/brand"), symbolAssets);
if (vendor) {
  const release = new Map(files);
  release.set("README.md", await readFile(resolve(root, "packages/site-header/README.md"), "utf8"));
  await distribute(vendor, release);
  await distribute(resolve(vendor, "../../public/brand"), symbolAssets);
}
console.info(`[header] ${check ? "Verified" : "Built"} canonical release${vendor ? " and Governance distribution" : ""}.`);
