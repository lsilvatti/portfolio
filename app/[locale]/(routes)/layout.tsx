import { BackgroundEffects } from "@/components/atoms/BackgroundEffects/BackgroundEffects";
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
      
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col flex-1">
        {children}
      </main>
      
      <Footer />
    </>
  );
}