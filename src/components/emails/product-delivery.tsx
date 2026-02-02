import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ProductDeliveryEmailProps {
  customerName: string;
  productName: string;
  /** URL pública da logo. Preferir sobre cid: para compatibilidade (Gmail, Resend). */
  logoUrl?: string | null;
}

const ProductDeliveryEmail = (props: ProductDeliveryEmailProps) => {
  const { customerName, productName, logoUrl } = props;
  const logoSrc = logoUrl ?? "cid:carslab-logo";

  return (
    <Html lang="pt-BR">
      <Head>
        <title>{`Seu ${productName} está pronto!`}</title>
      </Head>
      <Preview>
        Olá {customerName}! Seu {productName} está pronto para download.
      </Preview>
      <Tailwind>
        <Body
          style={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#272727",
            margin: 0,
            padding: 0,
          }}
        >
          <Container
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              backgroundColor: "#272727",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <Section
              style={{
                backgroundColor: "#16a34a",
                borderRadius: "8px 8px 0 0",
                padding: "32px 24px 24px",
                textAlign: "center",
              }}
            >
              <Section style={{ textAlign: "center", marginBottom: "16px" }}>
                <Img
                  src={logoSrc}
                  alt="CarsLab"
                  width={120}
                  height={48}
                  style={{
                    display: "inline-block",
                    margin: "0 auto",
                    maxWidth: "120px",
                    height: "auto",
                  }}
                />
              </Section>
              <Text
                style={{
                  margin: "0",
                  color: "#ffffff",
                  fontSize: "28px",
                  fontWeight: "bold",
                  lineHeight: "1.2",
                }}
              >
                Seu {productName} chegou!
              </Text>
              <Text
                style={{
                  margin: "8px 0 0 0",
                  color: "#e8f5e9",
                  fontSize: "16px",
                }}
              >
                Agradecemos por escolher nosso conteúdo! 💛
              </Text>
            </Section>

            {/* Content */}
            <Section
              style={{
                padding: "32px 24px",
                width: "100%",
                maxWidth: "600px",
              }}
            >
              {/* Welcome message */}
              <Section style={{ textAlign: "center", marginBottom: "24px" }}>
                <Text
                  style={{
                    margin: "0",
                    color: "#ffde59",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  Olá, {customerName}!
                </Text>
              </Section>

              {/* Main message */}
              <Section
                style={{
                  backgroundColor: "#333333",
                  padding: "24px",
                  borderRadius: "8px",
                  border: "4px solid #ffde59",
                  marginBottom: "24px",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    margin: "0 0 16px 0",
                    color: "#e5e7eb",
                    fontSize: "16px",
                    lineHeight: "1.6",
                  }}
                >
                  Agradecemos por escolher nosso produto! 💛
                </Text>
                <Text
                  style={{
                    margin: "0 0 16px 0",
                    color: "#e5e7eb",
                    fontSize: "16px",
                    lineHeight: "1.6",
                  }}
                >
                  Sua compra do produto <strong style={{ color: "#ffde59" }}>{productName}</strong> foi confirmada com sucesso!
                </Text>
                <Text
                  style={{
                    margin: "0",
                    color: "#e5e7eb",
                    fontSize: "16px",
                    lineHeight: "1.6",
                  }}
                >
                  O arquivo do seu produto está anexado neste email e pronto para download. Aproveite!
                </Text>
              </Section>

              {/* Additional info */}
              <Section
                style={{
                  backgroundColor: "#333333",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid #6b7280",
                }}
              >
                <Text
                  style={{
                    margin: "0 0 8px 0",
                    color: "#ffde59",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  💡 Dica:
                </Text>
                <Text
                  style={{
                    margin: "0",
                    color: "#e5e7eb",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  Salve o arquivo em um local seguro para acessá-lo sempre que precisar. Caso tenha alguma dúvida, entre em contato conosco!
                </Text>
              </Section>
            </Section>

            {/* Footer */}
            <Section
              style={{
                padding: "24px",
                backgroundColor: "#272727",
                borderRadius: "0 0 8px 8px",
                borderTop: "1px solid #4b5563",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  margin: "0 0 8px 0",
                  color: "#9ca3af",
                  fontSize: "14px",
                }}
              >
                Precisa de ajuda? Entre em contato conosco:
              </Text>
              <Text style={{ margin: "0 0 16px 0" }}>
                <a
                  href="https://wa.me/64996775544"
                  style={{
                    color: "#ffde59",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Suporte WhatsApp
                </a>
              </Text>

              <Text
                style={{
                  margin: "0 0 8px 0",
                  color: "#9ca3af",
                  fontSize: "12px",
                  lineHeight: "1.4",
                }}
              >
                Este email foi enviado automaticamente pois você comprou um de nossos produtos.
              </Text>

              <Text
                style={{
                  margin: "0 0 8px 0",
                  color: "#9ca3af",
                  fontSize: "12px",
                  lineHeight: "1.4",
                }}
              >
                Se você não reconhece este email, por favor, entre em contato conosco.
              </Text>

              <Text
                style={{
                  margin: "0",
                  color: "#9ca3af",
                  fontSize: "12px",
                  lineHeight: "1.4",
                }}
              >
                Equipe CarsLab 💛
                {" "}
                © 2025 CarsLab. Todos os direitos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ProductDeliveryEmail;
