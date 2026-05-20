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
  "Dr. Victor Erude Lidaywa": { year: "NYAYO", section: "board" },
  "Julius Ngombo": { year: "NYAYO", section: "board" },
  "Martha Valentine Masila": { year: "NYAYO", section: "board" },
  "Jackson Adembesa, Eng.": { year: "NYAYO", section: "board" },
  "Chrispin Ng'ang'a": { year: "NYAYO", section: "board" },
  "Roy Oduor": { year: "NYAYO", section: "board" },
  "Tony Erude Kirigano": { year: "NYAYO", section: "board" },
  "Gloria Miseri": { year: "NYAYO", section: "board" },
  "Rev. Byron Erude": { year: "SIMBA", section: "members" },
  "Max K Erude": { year: "SIMBA", section: "members" },
  "Silvester Erude": { year: "SIMBA", section: "members" },
  "Alex Gonzo": { year: "SHUJAA", section: "volunteers" },
  "Emily Sang": { year: "SHUJAA", section: "volunteers" },
};

async function patch() {
  const members = await client.fetch(`*[_type == "boardMember"]{_id, name}`);
  for (const m of members) {
    const a = assignments[m.name];
    if (a) {
      await client
        .patch(m._id)
        .set({ year: a.year, section: a.section })
        .commit();
      console.log("Patched:", m.name, "->", a.year, a.section);
    }
  }
  console.log("Done");
}
patch().catch(console.error);
