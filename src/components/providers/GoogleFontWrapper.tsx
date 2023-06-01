import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export function GoogleFontWrapper({ children }: { children: React.ReactNode }) {
  return <div className={inter.className}>{children}</div>;
}
