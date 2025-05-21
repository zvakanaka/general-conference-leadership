// Generates data/derived/general-conference-leadership.json for each General Conference since April, 1971
import { ensureDir } from "jsr:@std/fs";
import firstPresidency from "../data/first_presidency.json" with { type: "json" };
import quorumOf12 from "../data/quorum_of_12.json" with { type: "json" };

const startYear = 1971;
const now = new Date();
const conferences = [];

/**
 * Get the dates of General Conferences from the start year to the end year.
 * The conferences are held in April and October.
 * The function returns an array of objects with the year, month, and label.
 * 
 * @param {number} startYear - The starting year for the conferences.
 * @param {number} endYear - The ending year for the conferences.
 * @returns {Array} An array of objects with the year, month, and label.
 */
function getConferenceDates(startYear, endYear) {
  const dates = [];
  for (let year = startYear; year <= endYear; year++) {
    dates.push({ year, month: 4, label: `April ${year}` });
    dates.push({ year, month: 10, label: `October ${year}` });
  }
  // Remove future conferences
  return dates.filter(({ year, month }) => {
    if (year < now.getFullYear()) return true;
    if (year === now.getFullYear() && month <= now.getMonth() + 1) return true;
    return false;
  });
}

/**
 * Try to parse a date string in various formats.
 *
 * @param {string} str - The date string to parse.
 * @returns {Date|null} A Date object if parsing was successful, otherwise null.
 */
function parseDate(str) {
  // Try to parse a date range string, e.g. "14 January 2018 –"
  const match = str.match(/(\d{1,2} \w+ \d{4})/);
  if (match) return new Date(match[1]);
  // fallback: try to parse year
  const yearMatch = str.match(/\d{4}/);
  if (yearMatch) return new Date(`${yearMatch[0]}-01-01`);
  return null;
}

/**
 * Finds the names of leaders serving on a given date.
 *
 * @param {Date} date - The date to check for leadership.
 * @param {Array} data - The chronology data array to search.
 * @param {string} rangeKey - The key in each entry that contains the date range string.
 * @param {string[]} nameKeys - The keys in each entry that may contain leader names.
 * @returns {string[]} An array of unique leader names serving on the given date.
 */
function findLeadership(date, data, rangeKey, nameKeys) {
  // Find the last entry whose range includes the date
  for (let i = data.length - 1; i >= 0; i--) {
    const entry = data[i];
    const range = entry[rangeKey] || entry["Dates"];
    if (!range) continue;
    // Range can be "start – end" or "start –"
    const [start, end] = range.split(/[–-]/).map(s => s.trim());
    const startDate = parseDate(start);
    const endDate = end && end !== "present" ? parseDate(end) : now;
    if (startDate && date >= startDate && date <= endDate) {
      // Collect all names from the relevant keys
      const names = [];
      for (const key of nameKeys) {
        if (entry[key]) {
          names.push(...entry[key].split(/,|\n|\t|;/).map(n => n.trim()).filter(Boolean));
        }
      }
      // Remove duplicates and empty
      return [...new Set(names.filter(Boolean))];
    }
  }
  return [];
}

const conferenceDates = getConferenceDates(startYear, now.getFullYear());
for (const conf of conferenceDates) {
  const confDate = new Date(`${conf.year}-${conf.month.toString().padStart(2, "0")}-01`);
  // Use the 1st of the month as the reference date
  const firstPres = findLeadership(confDate, firstPresidency, "Date range", ["President of the Church(and Assistant Presidents)", "First Counselor", "Second Counselor", "Other Counselors(3C = Third Counselor)C = CounselorAC = Assistant Counselor)"]);
  const quorum12 = findLeadership(confDate, quorumOf12, "Dates", ["Members of the Quorum(In Order of Seniority)"]);
  conferences.push({
    conference: conf.label,
    date: confDate.toISOString().slice(0, 10),
    firstPresidency: firstPres,
    quorumOf12: quorum12,
  });
}

await ensureDir("data/derived");
await Deno.writeTextFile(
  "data/derived/general-conference-leadership.json",
  JSON.stringify(conferences, null, 2)
);
console.log(`Wrote data to data/derived/general-conference-leadership.json`);
