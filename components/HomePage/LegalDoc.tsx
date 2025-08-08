"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

interface DocumentData {
  _id: string;
  title: string;
  description: string;
  email: string;
  country: string;
  image: string;
}

const LegalDoc = () => {
  const currentRegion = useAppSelector((state) => state.region.currentRegion);
  const countryName =
    currentRegion === "canada"
      ? "canada"
      : currentRegion === "us"
        ? "usa"
        : null;

  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!countryName) {
        setDocumentData(null);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/custom/legal-document`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to fetch documents");
        const json = await res.json();
        const allDocs: DocumentData[] = json.data || [];

        // Filter by country (case-insensitive)
        const filteredDoc = allDocs.find(
          (doc) => doc.country.toLowerCase() === countryName.toLowerCase()
        );

        setDocumentData(filteredDoc || null);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setDocumentData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [countryName]);

  return (
    <div>
      <section className="py-10 bg-[#4F7695] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="w-[146px] lg:w-[146px] h-[5px] lg:h-[68px] relative">
                {documentData?.image ? (
                  <Image
                    src={documentData.image}
                    alt={documentData.title || "Document Image"}
                    width={900}
                    height={900}
                    className="object-cover w-full h-full rounded-lg"
                    priority
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full rounded-lg flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl md:text-3xl lg:text-[25px] font-semibold leading-[120%] mb-2">
                  {loading
                    ? "Loading..."
                    : documentData?.title || "Looking For Legal Documents?"}
                </h2>
                <p className="text-sm">
                  {loading
                    ? "Please wait while we load the documents."
                    : documentData?.description ||
                    "Thousands of templates to choose from, professionally crafted."}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-8">
              <Link href="/products">
                <Button className="bg-white h-[46px] lg:h-[56px] text-[#2c5d7c] hover:bg-gray-100">
                  <p>Buy Now</p>
                  <span className=" h-[30px] lg:h-[35px] w-10 rounded-[8px] bg-[#23547B] flex items-center justify-center">
                    <FaArrowRightLong size={30} className="text-white text-xl" />
                  </span>
                </Button>
              </Link>
              <Link href={`mailto:${documentData?.email || "support@lawbie.com"}`}>
                <div className="flex gap-2">
                  <span className="bg-white h-12 w-12 rounded-full flex items-center justify-center">
                    <Mail className="text-xl text-[#23547B]" />
                  </span>
                  <div>
                    <p className="font-bold">Contact Us</p>
                    <Link
                      className="text-xs inline-block"
                      href={`mailto:${documentData?.email || "support@lawbie.com"}`}
                    >
                      {documentData?.email || "support@lawbie.com"}
                    </Link>
                  </div>
                </div>
              </Link>

            </div>
          </div>
          {/* Show the document image if present (optional large image below) */}
          {/* You can remove this block if you don't want this extra image */}
          {/* {documentData?.image && (
            <div className="mt-8 flex justify-center">
              <Image
                src={documentData.image}
                alt={documentData.title}
                width={600}
                height={400}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          )} */}
        </div>
      </section>
    </div>
  );
};

export default LegalDoc;
