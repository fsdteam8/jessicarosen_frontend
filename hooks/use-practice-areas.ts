"use client";

import { useQuery } from "@tanstack/react-query";

interface PracticeArea {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PracticeAreasResponse {
  success: boolean;
  message: string;
  data: PracticeArea[];
}

const fetchPracticeAreas = async (): Promise<PracticeAreasResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/practice-area/all`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch practice areas");
  }

  return response.json();
};

export function usePracticeAreas() {
  return useQuery({
    queryKey: ["practice-areas"],
    queryFn: fetchPracticeAreas,
    staleTime: 10 * 60 * 1000, // 10 minutes
    // cacheTime: 15 * 60 * 1000, // 15 minutes
  });
}

export type { PracticeArea, PracticeAreasResponse };
