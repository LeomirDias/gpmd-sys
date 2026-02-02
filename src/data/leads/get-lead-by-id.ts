import { eq } from "drizzle-orm";

import { db } from "@/db";
import { leads } from "@/db/schema";

export const getLeadById = async (id: string) => {
  const [lead] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);

  return lead ?? null;
};
