import fs from "fs";
import path from "path";

/** Content-ID usado no template de email para a logo (src="cid:carslab-logo") */
export const EMAIL_LOGO_CID = "carslab-logo";

const LOGO_FILENAME = "CarsLabLogo.png";

/**
 * Retorna a URL pública da logo para uso em emails.
 * Preferir esta URL no template para máxima compatibilidade (Gmail, Resend, etc.).
 * Requer NEXT_PUBLIC_APP_URL configurado (ex: https://seudominio.com).
 */
export function getEmailLogoUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!base) return null;
  const url = base.replace(/\/$/, "");
  return `${url}/${LOGO_FILENAME}`;
}

/**
 * Retorna o anexo da logo CarsLab para uso como imagem inline em emails (CID).
 * Incluir content_type ajuda clientes a renderizarem corretamente.
 */
export function getEmailLogoAttachment(): {
  filename: string;
  content: string;
  contentId: string;
  contentType?: string;
} {
  const logoPath = path.join(process.cwd(), "public", LOGO_FILENAME);
  const buffer = fs.readFileSync(logoPath);
  return {
    filename: LOGO_FILENAME,
    content: buffer.toString("base64"),
    contentId: EMAIL_LOGO_CID,
    contentType: "image/png",
  };
}
