// @ts-self-types="./types.d.ts"
import leadership from "./data/derived/general-conference-leadership.json" with { type: "json" };
import type GeneralConferenceLeadership from "./types.d.ts";

/** The leadership data as an array of GeneralConferenceLeadership objects. */
export default leadership as GeneralConferenceLeadership[];
