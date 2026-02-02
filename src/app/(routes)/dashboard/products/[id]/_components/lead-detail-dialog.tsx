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
import { getProductNameById } from "@/actions/product/get-product-name";

dayjs.locale("pt-br");

interface LeadDetailDialogProps {
  lead: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    contact_type: string;
    conversion_status: string;
    remarketing_status: string;
    landing_source: string;
    user_type: string;
    consent_marketing: boolean;
    created_at: Date;
    product_id: string | null;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LeadDetailDialog = ({
  lead,
  open,
  onOpenChange,
}: LeadDetailDialogProps) => {
  const [productName, setProductName] = useState<string | null>(null);
  const [productLoading, setProductLoading] = useState(false);

  useEffect(() => {
    if (!open || !lead.product_id) {
      setProductName(null);
      return;
    }
    setProductLoading(true);
    getProductNameById(lead.product_id)
      .then((p) => setProductName(p?.name ?? null))
      .finally(() => setProductLoading(false));
  }, [open, lead.product_id]);

  const getConversionStatusLabel = (status: string) => {
    switch (status) {
      case "converted":
        return "Convertido";
      case "not_converted":
        return "Não Convertido";
      default:
        return status;
    }
  };

  const getRemarketingStatusLabel = (status: string) => {
    switch (status) {
      case "sent_remarketing":
        return "Enviado";
      case "not_sent_remarketing":
        return "Não Enviado";
      default:
        return status;
    }
  };

  const getContactTypeLabel = (type: string) => {
    switch (type) {
      case "email":
        return "Email";
      case "phone":
        return "Telefone";
      case "both":
        return "Email e Telefone";
      default:
        return type;
    }
  };

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "hobby":
        return "Hobby";
      case "empreendedor":
        return "Empreendedor";
      default:
        return type;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Lead</DialogTitle>
          <DialogDescription>
            Informações completas do lead
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Nome</p>
              <p className="mt-1">{lead.name}</p>
            </div>
            {lead.email && (
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Email
                </p>
                <p className="mt-1">{lead.email}</p>
              </div>
            )}
            {lead.phone && (
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Telefone
                </p>
                <p className="mt-1">{lead.phone}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Tipo de Contato
              </p>
              <p className="mt-1">{getContactTypeLabel(lead.contact_type)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Tipo de Usuário
              </p>
              <p className="mt-1">{getUserTypeLabel(lead.user_type)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Status de Conversão
              </p>
              <p className="mt-1">
                {getConversionStatusLabel(lead.conversion_status)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Remarketing
              </p>
              <p className="mt-1">
                {getRemarketingStatusLabel(lead.remarketing_status)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Consentimento Marketing
              </p>
              <p className="mt-1">
                {lead.consent_marketing ? "Sim" : "Não"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Fonte de Landing
              </p>
              <p className="mt-1">{lead.landing_source}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Produto
              </p>
              <p className="mt-1">
                {!lead.product_id
                  ? "Não associado a nenhum produto"
                  : productLoading
                    ? "Carregando..."
                    : productName ?? lead.product_id}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Data de registro
              </p>
              <p className="mt-1">
                {dayjs(lead.created_at).format("DD/MM/YYYY [às] HH:mm")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
