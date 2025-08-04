"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountLayout } from "@/components/account/account-layout";

interface TermsAndConditions {
  title: string;
  description: string;
}

const fetchTermsAndConditions = async (): Promise<TermsAndConditions> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/custom/terms`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch terms and conditions");
  }

  const result = await res.json();
  return result.data;
};

export default function TermsAndConditionsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["terms-and-conditions"],
    queryFn: fetchTermsAndConditions,
  });

  return (
    <AccountLayout activeTab="terms">
      <div className="bg-white rounded-lg shadow-sm p-8 space-y-10">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/6" />
          </div>
        ) : isError || !data ? (
          <div className="text-red-500">Failed to load terms and conditions.</div>
        ) : (
          <>
            <h1 className="text-[32px] font-semibold mb-10 text-[#131313]">
              {data.title}
            </h1>

            <div
              className="text-base text-[#645949] space-y-6 [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-8 [&_li]:mb-1 [&_p]:mb-3"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </>
        )}
      </div>
    </AccountLayout>
  );
}
