// Script to clean suffixes from names in general-conference-leadership.json

const path = "./data/derived/general-conference-leadership.json";
const raw = await Deno.readTextFile(path);
const data = JSON.parse(raw);

function cleanName(name: string): string {
  return name
    .replace(/\s*\(.*$/, "")
    .replace(/\s*called as.*$/, "")
    .replace(/\s*\[.*$/, "")
    .replace(/\s*–.*$/, "")
    .replace(/\s*—.*$/, "")
    .replace(/\s*- .*/, "")
    .trim();
}

for (const conf of data) {
  if (Array.isArray(conf.firstPresidency)) {
    conf.firstPresidency = conf.firstPresidency.map(cleanName);
  }
  if (Array.isArray(conf.quorumOf12)) {
    conf.quorumOf12 = conf.quorumOf12.map(cleanName);
  }
}

await Deno.writeTextFile(path, JSON.stringify(data, null, 2));
console.log("Cleaned names in", path);
