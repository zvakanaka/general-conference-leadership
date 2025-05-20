import leadership from "./general-conference-leadership.json" with { type: "json" };

Deno.test("general-conference-leadership.json has the expected format", () => {
  for (const item of leadership) {
    if (typeof item !== "object" || item === null) throw new Error("Item is not an object");
    if (typeof item.conference !== "string") throw new Error("conference is not a string");
    if (typeof item.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) throw new Error(`date is not a valid YYYY-MM-DD string: ${item.date}`);
    if (!Array.isArray(item.firstPresidency)) throw new Error("firstPresidency is not an array");
    if (!Array.isArray(item.quorumOf12)) throw new Error("quorumOf12 is not an array");
    for (const name of item.firstPresidency) {
      if (typeof name !== "string") throw new Error("firstPresidency member is not a string");
    }
    for (const name of item.quorumOf12) {
      if (typeof name !== "string") throw new Error("quorumOf12 member is not a string");
    }
  }
});
