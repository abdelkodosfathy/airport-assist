export interface Package {
  package_id: number;
  service_type: string;
  package_name: string;
  package_description: string;
  package_slug: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PackagesResponse {
  status: number;
  msg: string | null;
  data: {
    packages: Package[];
    total_result: number;
  };
}
