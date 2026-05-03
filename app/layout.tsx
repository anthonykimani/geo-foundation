import type { Metadata } from "next";
import { DM_Sans, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/home/footer";
import AutoDonateModal from "@/components/shared/auto-donate-modal";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Gladys Erude Organization",
  description: "Build a Classroom. Brick by Brick. Sustainable impact through transparency, participation, and measurable action.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className="font-dm-sans antialiased">
        <Header />
        {children}
        <Footer />
        <AutoDonateModal />
      </body>
    </html>
  );
}
