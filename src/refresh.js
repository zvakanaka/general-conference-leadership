// Scrapes Wikipedia tables and updates JSON files for LDS Church leadership chronology
import { DOMParser } from "jsr:@b-fuze/deno-dom";

const urls = [
  {
    url: "https://en.wikipedia.org/wiki/Chronology_of_the_First_Presidency_(LDS_Church)",
    file: "data/first_presidency.json",
    tableIndex: 0, // adjust if needed
  },
  {
    url: "https://en.wikipedia.org/wiki/Chronology_of_the_Quorum_of_the_Twelve_Apostles_(LDS_Church)",
    file: "data/quorum_of_12.json",
    tableIndex: 0, // adjust if needed
  },
];

/**
 * Fetches a Wikipedia page, parses the specified table, and returns its data as an array of objects.
 *
 * @param {string} url - The URL of the Wikipedia page to fetch.
 * @param {number} tableIndex - The index of the table to parse on the page.
 * @returns {Promise<Object[]>} An array of objects representing the table rows, with keys from the table headers.
 */
async function fetchAndParse(url, tableIndex) {
  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  if (!doc) throw new Error("Failed to parse HTML");
  const tables = doc.querySelectorAll("table.wikitable");
  const table = tables[tableIndex];
  if (!table) throw new Error("Table not found");
  const rows = table.querySelectorAll("tr");
  const headers = Array.from(rows[0].querySelectorAll("th")).map(th => th.textContent.trim());
  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll("td");
    if (cells.length === 0) continue;
    const entry = {};
    for (let j = 0; j < cells.length; j++) {
      entry[headers[j] || `col${j}`] = cells[j].textContent.trim();
    }
    data.push(entry);
  }
  return data;
}

for (const { url, file, tableIndex } of urls) {
  const data = await fetchAndParse(url, tableIndex);
  console.log(`Fetched ${data.length} entries from ${url}`);
  await Deno.writeTextFile(file, JSON.stringify(data, null, 2));
  console.log(`Updated ${file}`);
}
