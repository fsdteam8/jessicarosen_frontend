export type PracticeAreaApiResponse = {
  success: boolean;
  message: string;
  data: PracticeAreaDataType[];
};

export type PracticeAreaDataType = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
