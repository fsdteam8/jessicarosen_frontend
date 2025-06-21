export interface Country {
  _id: string;
  countryName: string;
  states: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CountriesApiResponse {
  success: boolean;
  message: string;
  data: Country[];
}
