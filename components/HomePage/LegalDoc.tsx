import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Mail } from "lucide-react";

const LegalDoc = () => {
  return (
    <div>
      <section className="py-10 bg-[#2c5d7c] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Looking For Legal Documents?
              </h2>
              <p className="text-sm">
                Thousands of templates to choose from, professionally crafted.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Button className="bg-white h-[56px] text-[#2c5d7c] hover:bg-gray-100">
                <p>Buy Now</p>
                <span className="h-[40px] w-10 rounded-[8px] bg-[#23547B] flex items-center justify-center">
                  <ArrowRight size={30} className="text-white text-xl" />
                </span>
              </Button>
              <div className="flex gap-2">
                <span className="bg-white h-12 w-12 rounded-full flex items-center justify-center">
                  <Mail className="text-xl text-[#23547B]" />
                </span>
                <div>
                  <p className="font-bold">EMAIL US</p>
                  <p className="text-xs inline-block">SUPPORT@LAWFIRM.COM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalDoc;
