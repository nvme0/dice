import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dice",
  description: "Dice"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://unpkg.com/event-target@latest/min.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
