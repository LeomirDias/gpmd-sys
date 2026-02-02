"use server";

import { getProductById } from "@/data/products/get-products";

export const getProductNameById = async (
  id: string,
): Promise<{ name: string } | null> => {
  const product = await getProductById(id);
  return product ? { name: product.name } : null;
};
