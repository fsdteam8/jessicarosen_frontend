export const addToCartAPI = async ({
  resourceId,
  quantity,
  token,
}: {
  resourceId: string;
  quantity: number;
  token?: string;
}) => {
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
