import { Suspense } from "react";
import LocationsClient from "./LocationsClient";

export default function Locations() {
  return (
    // <Suspense fallback={null}>
    // {/* </Suspense> */}
      <LocationsClient />
  );
}