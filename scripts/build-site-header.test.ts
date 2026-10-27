import { test, expect } from "bun:test";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, copyFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { verifyHeader } from "./header-release.cjs";

test("header sync requires an explicit valid checkout and check mode never writes", () => {
  const root = mkdtempSync(join(tmpdir(), "interfold-header-"));
  try {
    const website = join(root, "Website"), governance = join(root, "Governance");
    const source = join(website, "packages/site-header/src");
    mkdirSync(source, { recursive: true });
    mkdirSync(join(website, "packages/site-header/assets"), { recursive: true });
    writeFileSync(join(website, "packages/site-header/assets/symbol-fold.svg"), '<svg xmlns="http://www.w3.org/2000/svg"/>');
    mkdirSync(join(website, "scripts"));
    mkdirSync(join(governance, "app"), { recursive: true });
    copyFileSync(resolve(import.meta.dir, "build-site-header.ts"), join(website, "scripts/build-site-header.ts"));
    copyFileSync(resolve(import.meta.dir, "header-release.cjs"), join(website, "scripts/header-release.cjs"));
    for (const name of ["index.tsx", "motion.tsx"]) writeFileSync(join(source, name), "export const value = 1;\n");
    for (const name of ["types.d.ts", "motion.types.d.ts"]) writeFileSync(join(source, name), "export declare const value: number;\n");
    writeFileSync(join(source, "styles.css"), ":root { --width: 1440px; }\n");
    writeFileSync(join(website, "packages/site-header/README.md"), "Canonical header\n");
    writeFileSync(join(governance, "app/package.json"), JSON.stringify({ name: "CRISPVoting" }));
    writeFileSync(join(governance, "DESIGN.md"), "Product rules\n");
    const env = { ...process.env }; delete env.INTERFOLD_GOVERNANCE_ROOT;
    const run = (...args: string[]) => spawnSync(process.execPath, [join(website, "scripts/build-site-header.ts"), "--sync-governance", ...args], { env, encoding: "utf8" });
    expect(run().status).not.toBe(0);
    expect(existsSync(join(website, "packages/site-header/lib"))).toBe(false);
    expect(existsSync(join(governance, "app/vendor"))).toBe(false);
    writeFileSync(join(website, ".interfold-design.local.json"), JSON.stringify({ governanceRoot: "../Governance" }));
    expect(run().status).toBe(0);
    const verify = () => verifyHeader({
      releaseRoot: join(governance, "app/vendor/site-header"),
      assetsRoot: join(governance, "app/public/brand"),
      sourceRoot: join(website, "packages/site-header"),
    });
    expect(verify).not.toThrow();
    const compiled = join(governance, "app/vendor/site-header/index.js");
    const original = readFileSync(compiled, "utf8");
    writeFileSync(compiled, original + "\n// local fork");
    expect(verify).toThrow("Modified shared header");
    writeFileSync(compiled, original);
    expect(readFileSync(join(governance, "app/public/brand/interfold-symbol-fold.svg"), "utf8"))
      .toBe(readFileSync(join(website, "public/brand/interfold-symbol-fold.svg"), "utf8"));
    expect(run("--check").status).toBe(0);
    const vendor = join(governance, "app/vendor/site-header/styles.css");
    const before = readFileSync(vendor, "utf8");
    writeFileSync(join(source, "styles.css"), ":root { --width: 1500px; }\n");
    expect(verify).toThrow("Shared header is stale");
    expect(run("--check").status).not.toBe(0);
    expect(readFileSync(vendor, "utf8")).toBe(before);
    expect(run("--governance-root", "../missing").status).not.toBe(0);
    expect(readFileSync(vendor, "utf8")).toBe(before);
    expect(run().status).toBe(0);
    expect(readFileSync(vendor, "utf8")).toContain("1500px");
  } finally { rmSync(root, { recursive: true, force: true }); }
});
