import { apiGet } from "@/lib/api";
import { PackagesResponse } from "../types/package";

export async function fetchPackages(): Promise<PackagesResponse> {
  return apiGet("/packages");
}
