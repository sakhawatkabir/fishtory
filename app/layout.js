import { Quicksand } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

export const metadata = {
  title: "Fish Tory",
  description: "Premium fish and seafood delivery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-sans antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
