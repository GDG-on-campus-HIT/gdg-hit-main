import { Metadata } from "next";
import { fetchEventByID } from "@/lib/api"; // Adjust the path as needed

// Get the base URL from environment variables or default to localhost
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gdghit.site";

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const data = (await fetchEventByID(params.id)) as any;

  if (!data || !data.event) {
    return {
      title: "Event Not Found - GDG on campus HIT",
      description: "The event details you are looking for could not be found.",
      robots: "noindex, nofollow",
    };
  }

  const event = data.event;
  
  // Additional safety checks for event properties
  if (!event.name || !event.description) {
    return {
      title: "Event - GDG on campus HIT",
      description: "Join our upcoming event hosted by the GDG on campus HIT. Stay tuned for exciting updates and insights!",
      robots: "index, follow",
    };
  }
  
  const title = event.name;
  const description = event.description;
  const eventImage = event.eventBanner?.url || "/images/ds-img.svg";

  return {
    title: `${title} - GDG on campus HIT`,
    description,
    openGraph: {
      title: `${title} - GDG on campus HIT`,
      description,
      url: `${baseUrl}/events/${params.id}`,
      type: "website",
      images: [
        {
          url: `${eventImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - GDG on campus HIT`,
      description,
      images: [`${eventImage}`],
    },
    robots: "index, follow",
    themeColor: "#0A0A23",
  };
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}