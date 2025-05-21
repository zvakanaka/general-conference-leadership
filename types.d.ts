/**
 * An item representing the leadership at a General Conference.
 */
export interface GeneralConferenceLeadership {
  conference: string;
  date: string; // ISO date string (YYYY-MM-DD)
  firstPresidency: string[];
  quorumOf12: string[];
}