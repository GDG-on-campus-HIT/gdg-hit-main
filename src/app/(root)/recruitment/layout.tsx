import { Metadata } from "next";

// Get the base URL from the environment variable or default to localhost for development
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Join GDG On Campus HIT - Recruitment",
  description:
    "Become a part of the GDG On Campus HIT community! Explore opportunities to contribute, learn, and grow with us. Apply now to join our team of tech enthusiasts.",
  // Essential meta tags
  viewport: "width=device-width, initial-scale=1",
  // Open Graph meta tags for social media
  openGraph: {
    title: "Join GDG On Campus HIT - Recruitment",
    description:
      "Become a part of the GDG On Campus HIT community! Explore opportunities to contribute, learn, and grow with us. Apply now to join our team of tech enthusiasts.",
    url: `${baseUrl}/recruitment`, // Update with the correct URL for the recruitment page
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/recruitment-og-image.jpg`, // Path to your recruitment-specific Open Graph image
        width: 1200,
        height: 630,
        alt: "Join GDG On Campus HIT - Recruitment",
      },
    ],
  },
  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "Join GDG On Campus HIT - Recruitment",
    description:
      "Become a part of the GDG On Campus HIT community! Explore opportunities to contribute, learn, and grow with us. Apply now to join our team of tech enthusiasts.",
    images: [`${baseUrl}/images/recruitment-og-image.jpg`], // Path to the image for Twitter
  },
  // Additional meta tags
  robots: "index, follow",
  themeColor: "#0E1116",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
   {children}
   </>
  );
}
