import Image from "next/image";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";

// Mock data for products
const products = [
  {
    id: 1,
    title: "Short Cause Matters",
    author: "Mr.Jason Bostian",
    price: "$59.00",
    salePrice: "$28",
    rating: 4.8,
    reviews: 15,
    image: "/assets/images/product1.png",
    language: "English Language",
    category: "Practical law",
    userImage: "/assets/images/user1.png",
  },
  {
    id: 2,
    title: "Securing Organizational Objectives",
    author: "Jane Shepherd",
    price: "$69.00",
    salePrice: "$28",
    rating: 4.8,
    reviews: 14,
    image: "/assets/images/product2.png",
    language: "English Language",
    category: "Practical law",
    userImage: "/assets/images/user2.png",
  },
  {
    id: 3,
    title: "Starting the Professional Engagement",
    author: "Arlene McCoy",
    price: "$59.00",
    salePrice: "$28",
    rating: 4.8,
    reviews: 12,
    image: "/assets/images/product3.png",
    language: "English Language",
    category: "Practical law",
    userImage: "/assets/images/user3.png",
  },
  {
    id: 4,
    title: "Community Benefit Organization",
    author: "Guy Hawkins",
    price: "$69.00",
    salePrice: "$28",
    rating: 4.8,
    reviews: 14,
    image: "/assets/images/product4.png",
    language: "English Language",
    category: "Practical law",
    userImage: "/assets/images/user4.png",
  },
  {
    id: 5,
    title: "Commercial Transactions Objective",
    author: "Cameron Williamson",
    price: "$59.00",
    salePrice: "$28",
    rating: 4.8,
    reviews: 15,
    image: "/assets/images/product5.png",
    language: "English Language",
    category: "Practical law",
    userImage: "/assets/images/user5.png",
  },
  {
    id: 6,
    title: "Community Benefit Organization",
    author: "Guy Hawkins",
    price: "$69.00",
    salePrice: "$28",
    rating: 4.8,
    reviews: 14,
    image: "/assets/images/product6.png",
    language: "English Language",
    category: "Practical law",
    userImage: "/assets/images/user5.png",
  },
  {
    id: 7,
    title: "Commercial Transactions Objective",
    author: "Cameron Williamson",
    price: "$59.00",
    salePrice: "$28",
    rating: 4.8,
    reviews: 15,
    image: "/assets/images/product5.png",
    language: "English Language",
    category: "Practical law",
    userImage: "/assets/images/user5.png",
  },
];

interface ProductListProps {
  viewMode?: "grid" | "list";
}

export default function ProductList({ viewMode = "list" }: ProductListProps) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-6"
      }
    >
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden border-0 shadow-none rounded-none"
        >
          <div
            className={
              viewMode === "grid"
                ? "flex flex-col h-full"
                : "flex flex-col md:flex-row gap-6 md:gap-7 lg:gap-8"
            }
          >
            <div className="">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={324}
                height={324}
                className="object-cover w-full md:w-[324px] h-[324px] rounded-[8px]"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="">
                  <h3 className="text-lg md:text-[19px] lg:text-xl text-[#2A2A2A] font-medium leading-[120%] trackingnormal mb-2">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src={product.userImage}
                      alt={product.author}
                      width={49}
                      height={49}
                      className="w-[49px] h-[49px] rounded-full"
                    />
                    <div>
                      <p className="text-xs font-normal text-[#2A2A2A] leading-[150%] pb-1">
                        Created by
                      </p>
                      <h4 className="w-[129px] text-base text-[#23547B] font-bold leading-[120%] tracking-normal">
                        {product.author}
                      </h4>
                    </div>
                  </div>

                  <p className="text-base text-[#424242] font-normal leading-[150%] tracking-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <div className="text-base font-medium text-[#131313] leading-[120%] tracking-normal mt-2 md:mt-3 lg:mt-4">
                    {product.language}, {product.category}
                  </div>
                </div>

                <div className="">
                  <div className="h-full  flex flex-col justify-center">
                    <div className="text-sm text-[#FF0000] font-medium leading-[120%] tracking-normal line-through pb-2">
                      {product.price}
                    </div>
                    <div className="text-base font-medium text-[#424242] leading-[120%] tracking-normal mb-4 md:mb-6 lg:mb-8">
                      Price: {product.salePrice}
                    </div>

                    <div className="flex items-center gap-1 mb-4 md:mb-5 lg:mb-6">
                      <span className="text-base font-medium text-[#131313] leading-[120%] tracking-normal">
                        {product.rating}
                      </span>
                      <FaStar size={20} color="#FFD700" />
                      <span className="text-base font-medium text-[#616161] leading-[120%] tracking-normal">
                        ({product.reviews}K)
                      </span>
                    </div>

                    <div className="">
                      <div>
                        <Button
                          size={"lg"}
                          className="bg-[#23547B] text-base font-bold text-white leading-[120%] tracking-normal py-[14px] px-[55px] rounded-[8px] "
                        >
                          Add To Cart
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 mt-3 md:mt-4 lg:mt-6">
                        <Button
                          size={"lg"}
                          className="bg-transparent border-[2px] border-[#23547B] text-base md:text-[17px] lg:text-lg font-bold text-[#23547B] leading-[120%] tracking-normal py-[13px] px-[47px]"
                        >
                          <Bookmark className="w-6 h-6 text-[#23547B]" /> Wish
                          List
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
