// interface CreateBookingQueryOptions {
//   airport?: string | null;
//   service?: string | null;
//   packageName?: string | null;
// }

// export function createBookingQuery({
//   airport,
//   service,
//   packageName,
// }: CreateBookingQueryOptions) {
//   const params = new URLSearchParams();

//   if (airport) params.set("airport", airport);
//   if (service) params.set("service", service);
//   if (packageName) params.set("package", packageName);

//   return params.toString();
// }
export function createBookingQuery(
  params: Record<string, string | number | boolean | null | undefined>,
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
}