"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";
import { ThemeProvider } from "@/hooks/theme-provider";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "@/components/Loader/Loader";

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Custom>{children}</Custom>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}


const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  return <>{isLoading ? <Loader/> : <>{children} </>}</>;
};