"use client";

import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./Provider";
import { ThemeProvider } from "@/hooks/theme-provider";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "@/components/Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeDialog } from "@/components/ThemeModeDialog";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-Poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DVZGQCR75G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DVZGQCR75G');
          `}
        </Script>
      </head>
      <body className={`${poppins.variable} ${poppins.className} min-h-screen`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Custom>{children}</Custom>
            <ThemeDialog/>
            <ToastContainer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};
