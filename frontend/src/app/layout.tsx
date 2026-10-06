import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MasterKey | Descubra seu próximo jogo",
    template: "%s | MasterKey",
  },
  description:
    "Explore o catálogo MasterKey. Descubra jogos, gêneros, plataformas, histórias e requisitos para sua próxima aventura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
