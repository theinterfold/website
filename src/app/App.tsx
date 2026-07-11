import { Analytics } from "@vercel/analytics/react";
import { ResponsiveLayout } from "./components/ResponsiveLayout";

export default function App() {
  return (
    <>
      <ResponsiveLayout />
      <Analytics />
    </>
  );
}