import { ResponsiveLayout } from "./components/ResponsiveLayout";

export default function App({ initialPath }: { initialPath?: string }) {
  return <ResponsiveLayout initialPath={initialPath} />;
}
