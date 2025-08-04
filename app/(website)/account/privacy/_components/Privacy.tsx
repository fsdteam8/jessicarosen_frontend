// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { Skeleton } from "@/components/ui/skeleton";

// interface PrivacyPolicy {
//   title: string;
//   description: string;
// }

// const fetchPrivacyPolicy = async (): Promise<PrivacyPolicy> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/admin/custom/privacy`,
//     {
//       headers: {
//         // Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch privacy policy");
//   }

//   const result = await res.json();
//   return result.data;
// };

// const PrivacyPolicyComponent = () => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["privacy-policy"],
//     queryFn: fetchPrivacyPolicy,
//   });

//   if (isLoading) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
//         <Skeleton className="h-8 w-2/3" />
//         <Skeleton className="h-4 w-full" />
//         <Skeleton className="h-4 w-5/6" />
//         <Skeleton className="h-4 w-4/6" />
//       </div>
//     );
//   }

//   if (isError || !data) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-8 text-red-500">
//         Failed to load privacy policy.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//         {data.title}
//       </h1>

//       <div
//         className="prose prose-h1:text-2xl prose-h2:text-xl prose-p:text-base prose-li:marker:text-gray-500 prose-ul:pl-5 prose-ol:pl-5 prose-headings:font-semibold prose-img:rounded-md prose-img:shadow-sm prose-a:text-blue-600 max-w-none text-gray-700"
//         dangerouslySetInnerHTML={{ __html: data.description }}
//       />
//     </div>
//   );
// };

// export default PrivacyPolicyComponent;
"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountLayout } from "@/components/account/account-layout";

interface PrivacyPolicy {
  title: string;
  description: string;
}

const fetchPrivacyPolicy = async (): Promise<PrivacyPolicy> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/custom/privacy`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch privacy policy");
  }

  const result = await res.json();
  return result.data;
};

export default function PrivacyPolicyPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["privacy-policy"],
    queryFn: fetchPrivacyPolicy,
  });

  return (
    <AccountLayout activeTab="privacy">
      <div className="space-y-7 mb-10 w-[90%] mx-auto text-justify">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/6" />
          </div>
        ) : isError || !data ? (
          <div className="text-red-500">Failed to load privacy policy.</div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="font-semibold text-[32px] text-[#131313] mb-10">
                {data.title}
              </h2>
              <div
                className="text-sm [&_h1]:text-[24px] [&_h2]:text-[20px] [&_ul]:list-disc [&_ul]:ml-4 [&_li]:mb-1 [&_p]:mb-3"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </>
        )}
      </div>
    </AccountLayout>
  );
}
