// Script to remove duplicates from firstPresidency and quorumOf12 lists in general-conference-leadership.json
const path = "./data/derived/general-conference-leadership.json";
const raw = await Deno.readTextFile(path);
const data = JSON.parse(raw);

/**
 * The firstPresidency and quorumOf12 properties are arrays of strings.
 * We need to remove duplicates from these arrays.
 * We can use a Set to remove duplicates from an array.
 * We can also use the Array.from() method to convert the Set back to an array.
 * 
 * @param {string[]} arr - The array to remove duplicates from.
 * @returns {string[]} - The array with duplicates removed.
 */
function unique(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

for (const conf of data) {
  if (Array.isArray(conf.firstPresidency)) {
    conf.firstPresidency = unique(conf.firstPresidency);
  }
  if (Array.isArray(conf.quorumOf12)) {
    conf.quorumOf12 = unique(conf.quorumOf12);
  }
}

await Deno.writeTextFile(path, JSON.stringify(data, null, 2));
console.log("Removed duplicates in", path);
