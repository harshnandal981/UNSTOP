import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxe Grand Hotel - Premium Reservations",
  description: "Luxury hotel room reservation system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
