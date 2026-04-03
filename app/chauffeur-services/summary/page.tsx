import { Suspense } from "react";
import Summry from "./summry";

export default function SummaryPage() {
  return (
    <Suspense fallback={null}>
      <Summry/>
    </Suspense>
  );
}