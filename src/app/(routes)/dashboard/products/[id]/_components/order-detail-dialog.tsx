"use client";

import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getOrderRelatedData } from "@/actions/order/get-order-related-data";
import type { OrderByProductId } from "@/data/orders/get-orders-by-product-id";

dayjs.locale("pt-br");

interface OrderDetailDialogProps {
  order: OrderByProductId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailDialog = ({
  order,
  open,
  onOpenChange,
}: OrderDetailDialogProps) => {
  const [lead, setLead] = useState<{ name: string; email: string | null } | null>(null);
  const [productNames, setProductNames] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !order) return;
    setLead(null);
    setProductNames(new Map());
    setLoading(true);
    const productIds = (order.products ?? []).map((p) => p.product_id);
    getOrderRelatedData(order.lead_id ?? null, productIds)
      .then(({ lead: l, products: prods }) => {
        setLead(l);
        setProductNames(new Map(prods.map((p) => [p.id, p.name])));
      })
      .finally(() => setLoading(false));
  }, [open, order?.id]);
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

  const products = Array.isArray(order.products) ? order.products : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido</DialogTitle>
          <DialogDescription>
            Informações completas do pedido
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                ID do Pedido
              </p>
              <p className="mt-1 font-mono text-sm">{order.order_id}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Data do Pedido
              </p>
              <p className="mt-1">
                {dayjs(order.order_date).format("DD/MM/YYYY [às] HH:mm")}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Tipo
              </p>
              <p className="mt-1">{getTypeLabel(order.order_type)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Valor Total
              </p>
              <p className="mt-1">{formatAmount(order.total_amount)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Status
              </p>
              <p className="mt-1">{getStatusLabel(order.status)}</p>
            </div>
            {order.lead_id && (
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Lead
                </p>
                {loading ? (
                  <p className="text-muted-foreground text-sm">Carregando...</p>
                ) : lead ? (
                  <div className="text-sm">
                    <p>{lead.name}</p>
                    {lead.email && (
                      <p className="text-muted-foreground text-xs">{lead.email}</p>
                    )}
                  </div>
                ) : (
                  <p className="font-mono text-muted-foreground text-xs">
                    {order.lead_id}
                  </p>
                )}
              </div>
            )}
          </div>
          {products.length > 0 && (
            <div>
              <p className="text-muted-foreground mb-2 text-sm font-medium">
                Produtos
              </p>
              <ul className="space-y-1 rounded-md border p-3">
                {products.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>
                      {loading
                        ? item.product_id
                        : productNames.get(item.product_id) ?? item.product_id}
                    </span>
                    <span>Qtd: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
