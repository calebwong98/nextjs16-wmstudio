"use server";

import Footer from "./_layout/Footer";
import Header from "./_layout/Header";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col relative min-h-screen container mx-auto">
      <Header />
      <main className="h-full w-full my-auto flex flex-col flex-1 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}
