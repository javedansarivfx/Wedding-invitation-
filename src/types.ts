export interface WeddingEvent {
  id: string;
  name: string;
  arabicName: string;
  date: string;
  formattedDate: string;
  time: string;
  venueName: string;
  venueAddress: string;
  dressCode: string;
  dressColorPalette: string[];
  description: string;
  highlights: string[];
  calendarTitle: string;
}

export interface StoryMilestone {
  id: string;
  title: string;
  arabicSubtitle: string;
  period: string;
  description: string;
  image: string;
}

export interface RsvpData {
  id?: string;
  guestName: string;
  email: string;
  phone: string;
  attendance: 'attending' | 'declining';
  guestCount: number;
  attendingEvents: string[];
  dietaryRestrictions: string;
  blessingMessage: string;
  submittedAt: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
