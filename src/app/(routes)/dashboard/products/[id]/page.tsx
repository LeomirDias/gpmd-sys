import { notFound, redirect } from "next/navigation";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/ui/page-container";
import { getEventsByProductId } from "@/data/events/get-events-by-product-id";
import { getLeadsByProductId } from "@/data/leads/get-leads-by-product-id";
import { getOrdersByProductId } from "@/data/orders/get-orders-by-product-id";
import { getProductById } from "@/data/products/get-products";

import { EventsSection } from "./_components/events-section";
import { LeadsSection } from "./_components/leads-section";
import { OrdersSection } from "./_components/orders-section";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Força renderização no servidor a cada requisição (evita cache vazio em produção)
export const dynamic = "force-dynamic";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const [leads, events, orders] = await Promise.all([
    getLeadsByProductId(id),
    getEventsByProductId(id),
    getOrdersByProductId(id),
  ]);

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <PageTitle>{product.name}</PageTitle>
          <PageDescription>
            Visualize leads, pedidos e eventos relacionados a este produto.
          </PageDescription>
        </div>
      </PageHeader>
      <PageContent>
        <LeadsSection leads={leads} />
        <OrdersSection orders={orders} />
        <EventsSection events={events} />
      </PageContent>
    </PageContainer>
  );
}
