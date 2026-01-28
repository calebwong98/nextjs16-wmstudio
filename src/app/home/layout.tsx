"use server";

import Footer from "./_layout/Footer";
import Header from "./_layout/Header";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen container mx-auto">
      <Header />
      <main className="h-full w-full relative">{children}</main>
      <Footer />
    </div>
  );
}
