"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { getOrderRelatedData } from "@/actions/order/get-order-related-data";
import type { OrderByProductId } from "@/data/orders/get-orders-by-product-id";

import { OrderDetailDialog } from "./order-detail-dialog";


interface OrderRowProps {
  order: OrderByProductId;
}

export const OrderRow = ({ order }: OrderRowProps) => {
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [leadEmail, setLeadEmail] = useState<string | null>(null);
  const [productNames, setProductNames] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const productIds = (order.products ?? []).map((p) => p.product_id);
    getOrderRelatedData(order.lead_id ?? null, productIds).then(
      ({ lead, products: prods }) => {
        setLeadEmail(lead?.email ?? null);
        setProductNames(new Map(prods.map((p) => [p.id, p.name])));
      }
    );
  }, [order.id]);

  const productNamesList = (order.products ?? [])
    .map((p) => productNames.get(p.product_id) ?? p.product_id)
    .join(", ");

  const getOrderTypeLabel = (type: string) => {
    switch (type) {
      case "sale":
        return "Venda";
      case "upsell":
        return "Upsell";
      default:
        return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "created":
        return "Criado";
      case "completed":
        return "Concluído";
      case "delivered":
        return "Entregue";
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lead_capture":
        return "Captura de Lead";
      case "sale":
        return "Venda";
      default:
        return type;
    }
  };

  const formatAmount = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-mono text-xs">{order.order_id}</TableCell>
        <TableCell className="max-w-xs truncate">
          {!order.lead_id
            ? "Não associado a nenhum lead"
            : leadEmail ?? order.lead_id}
        </TableCell>
        <TableCell className="max-w-xs truncate">
          {order.products?.length
            ? productNamesList
            : "—"}
        </TableCell>
        <TableCell>{getTypeLabel(order.order_type)}</TableCell>
        <TableCell>{formatAmount(order.total_amount)}</TableCell>
        <TableCell>{getStatusLabel(order.status)}</TableCell>
        <TableCell>
          {new Date(order.order_date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </TableCell>
        <TableCell>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDetailDialogOpen(true)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

      <OrderDetailDialog
        order={order}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </>
  );
};
