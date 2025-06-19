export interface ResourceTypeData {
  _id: string;
  resourceTypeName: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface ResourceTypeApiResponse {
  success: boolean;
  message: string;
  data: ResourceTypeData[];
}
