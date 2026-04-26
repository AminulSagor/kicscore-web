import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar/navbar";
import type { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F3F7F5] text-[#0B1F1A] dark:bg-background dark:text-foreground">
      <Navbar />
      <main className="flex-1 padding-x py-4">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
