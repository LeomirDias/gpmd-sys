"use server";

import { getLeadById } from "@/data/leads/get-lead-by-id";
import { getProductsByIds } from "@/data/products/get-products";

export type OrderRelatedLead = { name: string; email: string | null } | null;
export type OrderRelatedProduct = { id: string; name: string };

export const getOrderRelatedData = async (
  leadId: string | null,
  productIds: string[],
): Promise<{
  lead: OrderRelatedLead;
  products: OrderRelatedProduct[];
}> => {
  const [lead, productRows] = await Promise.all([
    leadId ? getLeadById(leadId) : Promise.resolve(null),
    productIds.length > 0 ? getProductsByIds(productIds) : Promise.resolve([]),
  ]);

  return {
    lead: lead ? { name: lead.name, email: lead.email } : null,
    products: productRows.map((p) => ({ id: p.id, name: p.name })),
  };
};
