
export interface EventType {
  eventBanner: {
    public_id: string;
    url: string;
  };
  _id: string;
  name: string;
  upiID: string;
  description: string;
  category: string;
  registrationFee: string;
  details: string;
  venue: string;
  eventDate: string;
  eventTime: string;
  is_upcoming: boolean;
  registration_open: boolean;
  faq: any[]; // Assuming FAQ items may vary in structure
  gallery: any[]; // Assuming gallery can have different formats
  createdAt: string;
  updatedAt: string;
  __v: number;
}
