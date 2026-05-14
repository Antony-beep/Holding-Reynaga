import Header from "@/components/global/Header";
import WhatsAppFAB from "@/components/global/WhatsAppFAB";
import Footer from "@/components/global/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <WhatsAppFAB />
      <Footer />
    </>
  );
}
