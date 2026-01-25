"use server";

import Footer from "./_layout/Footer";
import Header from "./_layout/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
