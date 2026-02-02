"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { getProductNameById } from "@/actions/product/get-product-name";

import { EventDetailDialog } from "./event-detail-dialog";

interface EventRowProps {
  event: {
    id: string;
    type: string;
    category: string;
    to: string;
    subject: string;
    sent_at: Date | null;
    created_at: Date;
    updated_at: Date;
    product_id: string | null;
    lead_id: string | null;
  };
}

export const EventRow = ({ event }: EventRowProps) => {
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [productName, setProductName] = useState<string | null>(null);

  useEffect(() => {
    if (!event.product_id) {
      setProductName(null);
      return;
    }
    getProductNameById(event.product_id).then((p) =>
      setProductName(p?.name ?? null)
    );
  }, [event.product_id]);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "sale":
        return "Venda";
      case "lead_capture":
        return "Captura de Lead";
      case "remarketing":
        return "Remarketing";
      case "upsell":
        return "Upsell";
      default:
        return category;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "email_delivery":
        return "Entrega via Email";
      case "whatsapp_delivery":
        return "Entrega via WhatsApp";
      default:
        return type;
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{event.id}</TableCell>
        <TableCell>{getTypeLabel(event.type)}</TableCell>
        <TableCell>{getCategoryLabel(event.category)}</TableCell>
        <TableCell>{event.to}</TableCell>
        <TableCell className="max-w-xs truncate">
          {!event.product_id
            ? "Não associado a nenhum produto"
            : productName ?? event.product_id}
        </TableCell>
        <TableCell>
          {event.created_at
            ? new Date(event.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            : "-"}
        </TableCell>
        <TableCell>
          {event.sent_at
            ? new Date(event.sent_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            : "-"}
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

      <EventDetailDialog
        event={event}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </>
  );
};
