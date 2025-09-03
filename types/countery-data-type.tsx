// ...existing code...

export interface Division {
  divisionName: string;
  // Add other properties if needed
}

export interface State {
  _id: string;
  stateName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  divisions?: Division[]; // <-- Add this line
}

// ...existing code...
export interface Country {
  _id: string;
  countryName: string;
  states: State[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CountriesApiResponse {
  success: boolean;
  message: string;
  data: Country[];
}
// ...existing code...