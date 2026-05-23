export type Track = "foundations" | "advanced";
export type FocusTrack = "ml" | "data_science" | "ai_apps";
export type MemberStatus = "active" | "inactive" | "graduated";
export type ApplicationStatus = "pending" | "accepted" | "redirected";
export type EventType = "deadline" | "session" | "showcase" | "milestone";

export interface Member {
  id: string;
  email: string;
  name: string;
  country?: string;
  age?: number;
  track: Track;
  cohort_number: number;
  focus_track?: FocusTrack;
  current_week: number;
  status: MemberStatus;
  created_at: string;
}

export interface Deliverable {
  id: string;
  member_id: string;
  week_number: number;
  submitted: boolean;
  submitted_at?: string;
  discord_link?: string;
}

export interface CohortEvent {
  id: string;
  cohort_number: number;
  title: string;
  description?: string;
  event_date: string;
  event_type: EventType;
  is_optional: boolean;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  country?: string;
  age?: number;
  track: Track;
  experience?: string;
  motivation?: string;
  hours_per_week?: string;
  proof_of_work?: string;
  status: ApplicationStatus;
  submitted_at: string;
}
