import { BackgroundEffects } from "@/components/atoms";
import { Header, Footer } from "@/components/organisms";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundEffects />

      <Header />
      
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col flex-1 pt-20 pb-16">
        {children}
      </main>
      
      <Footer />
    </>
  );
}