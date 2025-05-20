/**
 * An item representing the leadership at a General Conference.
 */
export interface GeneralConferenceLeadership {
  conference: string;
  date: string; // ISO date string (YYYY-MM-DD)
  firstPresidency: string[];
  quorumOf12: string[];
}

/**
 * The default export is an array of GeneralConferenceLeadership objects,
 * representing the leadership at each General Conference since April 1971.
 */
declare const generalConferenceLeadership: GeneralConferenceLeadership[];
export default generalConferenceLeadership;
