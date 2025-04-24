import "./globals.css";
import { Noto_Sans_Bengali } from "next/font/google";

const banglaFont = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "700"], variable: '--font-noto-sans-bengali' });

export const metadata = {
  title: "লগইন ইউজার",
  description: "ভূমি উন্নয়ন কর_Dakhila",
  icons: {
    icon: '/1000059296.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={banglaFont.className}>
        {children}
      </body>
    </html>
  );
}
