import { desc, sql } from "drizzle-orm";

import { db } from "@/db";
import { ordersTable } from "@/db/schema";

export type OrderProductItem = { product_id: string; quantity: number };

export type OrderByProductId = {
  id: string;
  order_id: string;
  order_date: Date;
  order_type: string;
  total_amount: number;
  status: string;
  products: OrderProductItem[];
  lead_id: string | null;
  created_at: Date;
};

export const getOrdersByProductId = async (
  productId: string,
): Promise<OrderByProductId[]> => {
  const rows = await db
    .select()
    .from(ordersTable)
    .where(
      sql`exists (
        select 1 from jsonb_array_elements(orders.products) as elem
        where (elem->>'product_id') = ${productId}
      )`,
    )
    .orderBy(desc(ordersTable.order_date));

  return rows.map((row) => ({
    ...row,
    products: (row.products ?? []) as OrderProductItem[],
  }));
};
