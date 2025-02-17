import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";

// Get the base URL from the environment variable or default to localhost for development
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "GDG On Campus - Haldia Institute of Technology",
  description:
    "Where ideas take flight and innovation knows no bounds—Google Developer Group On Campus - Haldia Institute of Technology is the launchpad for tomorrow’s tech leaders.",
  // Essential meta tags
  viewport: "width=device-width, initial-scale=1",
  // Open Graph meta tags for social media
  openGraph: {
    title: "GDG On Campus - Haldia Institute of Technology",
    description:
      "Join GDG On Campus HIT to explore Google Developer technologies, attend workshops, participate in hackathons, and connect with a vibrant tech community.",
    url: `${baseUrl}/`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/img/gdg-hit-og-image.jpg`, // Path to your Open Graph image
        width: 1200,
        height: 630,
        alt: "GDG On Campus HIT",
      },
    ],
  },
  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "GDG On Campus - Haldia Institute of Technology",
    description:
      "Join GDG On Campus HIT to explore Google Developer technologies, attend workshops, participate in hackathons, and connect with a vibrant tech community.",
    images: [`${baseUrl}/img/gdg-hit-og-image.jpg`], // Path to the image for Twitter
  },
  // Additional meta tags
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
