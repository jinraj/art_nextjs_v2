import type { Metadata } from "next";
import { Knewave, Poppins } from "next/font/google";
import "./styles/globals.css";
import Navbar from "./components/NavBar";

const fontTitle = Knewave({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400"]
});

const fontBody = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"]
});

export const metadata: Metadata = {
  title: "It Is Meaningful",
  description: "It Is Meaningful",
  openGraph: {
    title: "It Is Meaningful",
    description: "It Is Meaningful",
    tags: "itismeaningful, it is meaningful, paintings, photography, decors, sale"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${fontTitle.variable} ${fontBody.variable} antialiased min-h-screen bg-custom-white`}
      >
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
