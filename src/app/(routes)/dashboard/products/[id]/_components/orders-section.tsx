import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrderByProductId } from "@/data/orders/get-orders-by-product-id";

import { OrderRow } from "./order-row";

interface OrdersSectionProps {
  orders: OrderByProductId[];
}

export const OrdersSection = ({ orders }: OrdersSectionProps) => {
  if (orders.length === 0) {
    return (
      <div>
        <h2 className="mb-4 text-xl font-semibold">Pedidos</h2>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <p className="text-muted-foreground text-sm">
            Nenhum pedido encontrado para este produto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl font-semibold">Pedidos</h2>
        <p className="text-sm text-muted-foreground"> Total de pedidos: {orders.length}</p>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID do Pedido</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
