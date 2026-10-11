import { apiSlice } from "../apiSlice";

export type EntryPass = { code: string; qrUrl: string; passUrl: string };

export type MyCertificate = {
  _id?: string;
  code: string;
  kind: "participation" | "winner";
  position: number | null;
  issuedAt: string;
  event?: { _id: string; name: string; eventDate?: string } | null;
  viewUrl: string | null;
  downloadUrl: string | null;
  verifyUrl: string;
};

export type MyEvent = {
  registrationId: string;
  registeredAt: string;
  attendance: boolean;
  checkedInAt: string | null;
  position: number | null;
  event: {
    _id: string;
    name: string;
    eventDate: string;
    eventTime?: string;
    venue?: string;
    image: string | null;
    is_upcoming: boolean;
  };
  pass: EntryPass;
  certificate: Omit<MyCertificate, "event" | "_id"> | null;
};

export type MyPass = EntryPass & { checkedIn: boolean; checkedInAt: string | null };

export const meApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myEvents: builder.query<{ success: boolean; events: MyEvent[] }, void>({
      query: () => ({ url: "my-events", method: "GET", credentials: "include" as const }),
    }),
    myCertificates: builder.query<{ success: boolean; certificates: MyCertificate[] }, void>({
      query: () => ({ url: "my-certificate", method: "GET", credentials: "include" as const }),
    }),
    myPass: builder.query<MyPass & { success: boolean }, string>({
      query: (eventId) => ({ url: `events/${eventId}/my-pass`, method: "GET", credentials: "include" as const }),
    }),
  }),
});

export const { useMyEventsQuery, useMyCertificatesQuery, useMyPassQuery } = meApi;
