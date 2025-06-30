// Calendar and Event Model Types
export interface CalendarEvent {
  _id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  location?: string;
  reminder?: EventReminder;
  recurrence?: EventRecurrence;
  attendees: string[];
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type EventStatus = "confirmed" | "tentative" | "cancelled";

export interface EventReminder {
  enabled: boolean;
  minutes: number; // minutes before event
  method: "email" | "notification" | "both";
}

export interface EventRecurrence {
  type: "daily" | "weekly" | "monthly" | "yearly";
  interval: number; // every X days/weeks/months/years
  endDate?: string;
  count?: number; // number of occurrences
}

export interface CreateEventData {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  allDay?: boolean;
  location?: string;
  reminder?: EventReminder;
  recurrence?: EventRecurrence;
  attendees?: string[];
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  allDay?: boolean;
  location?: string;
  reminder?: EventReminder;
  recurrence?: EventRecurrence;
  attendees?: string[];
  status?: EventStatus;
}

export interface CalendarView {
  type: "month" | "week" | "day" | "agenda";
  startDate: string;
  endDate: string;
}

export interface CalendarFilter {
  startDate?: string;
  endDate?: string;
  status?: EventStatus[];
  searchQuery?: string;
}
