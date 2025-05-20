// Script to remove duplicates from firstPresidency and quorumOf12 lists in general-conference-leadership.json

const path = "./data/derived/general-conference-leadership.json";
const raw = await Deno.readTextFile(path);
const data = JSON.parse(raw);

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
