"use client";

import { Eye } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import type { OrderByProductId } from "@/data/orders/get-orders-by-product-id";
import { OrderDetailDialog } from "./order-detail-dialog";


interface OrderRowProps {
  order: OrderByProductId;
}

export const OrderRow = ({ order }: OrderRowProps) => {
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

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
        <TableCell>
          {new Date(order.order_date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </TableCell>
        <TableCell>{getTypeLabel(order.order_type)}</TableCell>
        <TableCell>{formatAmount(order.total_amount)}</TableCell>
        <TableCell>{getStatusLabel(order.status)}</TableCell>
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
