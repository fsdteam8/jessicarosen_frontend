export interface AllProductDataTypeResponse {
  success: boolean;
  message: string;
  data: ProductDataType[];
  pagination: Pagination;
}

export interface ProductDataType {
  category: string;
  categoryId: string;
  _id: string;
  title: string;
  country: string;
  states: string[];
  resourceType: string[];
  description: string;
  price: number;
  discountPrice: number;
  quantity: number;
  format: string;
  file: FileInfo;
  thumbnail: string[];
  images: string[];
  createdBy: User;
  status: string;
  practiceAreas: string[];
  productId: string;
  createdAt: string;
  averageRating: number;
  totalReviews: number;
}

export interface FileInfo {
  url: string | null;
  type: string | null;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
