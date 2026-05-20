const { createClient } = require("@sanity/client");
const fs = require("fs");

const env = fs.readFileSync(".env", "utf8");
const token = env.match(/SANITY_TOKEN=(.+)/)[1].trim();

const client = createClient({
  projectId: "v180y67k",
  dataset: "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const assignments = {
  "Dr. Victor Erude Lidaywa": { year: "2026", section: "board" },
  "Julius Ngombo": { year: "2026", section: "board" },
  "Martha Valentine Masila": { year: "2026", section: "board" },
  "Jackson Adembesa, Eng.": { year: "2026", section: "board" },
  "Chrispin Ng'ang'a": { year: "2026", section: "board" },
  "Roy Oduor": { year: "2026", section: "board" },
  "Tony Erude Kirigano": { year: "2026", section: "board" },
  "Gloria Miseri": { year: "2026", section: "board" },
  "Rev. Byron Erude": { year: "2025", section: "members" },
  "Max K Erude": { year: "2025", section: "members" },
  "Silvester Erude": { year: "2025", section: "members" },
  "Alex Gonzo": { year: "2024", section: "volunteers" },
  "Emily Sang": { year: "2024", section: "volunteers" },
};

async function patch() {
  const members = await client.fetch(`*[_type == "boardMember"]{_id, name}`);
  for (const m of members) {
    const a = assignments[m.name];
    if (a) {
      await client
        .patch(m._id)
        .set({
          year: a.year,
          section: a.section,
          description: m.description || undefined,
        })
        .commit();
      console.log("Patched:", m.name, "->", a.year, a.section);
    }
  }
  console.log("Done");
}
patch().catch(console.error);
