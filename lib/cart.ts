
export interface AddToCartRequest {
  resourceId: string;
  quantity: number;
  token?: string;
}

export interface AddToCartResponse {
  status: boolean;
  message: string;
  data: {
    _id: string;
    user: string;
    items: {
      resource: string;
      quantity: number;
      price: number;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}



export const addToCartAPI = async ({
  resourceId,
  quantity,
  token,
}: AddToCartRequest): Promise<AddToCartResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ resourceId, quantity }),
  });

  if (!res.ok) {
    throw new Error("Failed to add item to cart");
  }

  return res.json();
};
