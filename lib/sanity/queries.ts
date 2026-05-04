import { client } from "../sanity";

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getStats() {
  const query = `*[_type == "stat"]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getSocialLinks() {
  const query = `*[_type == "socialLink"]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getTeamMembers() {
  const query = `*[_type == "teamMember"]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getBoardMembers() {
  const query = `*[_type == "boardMember"]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getValues() {
  const query = `*[_type == "value"]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getHomePage() {
  const query = `*[_type == "homePage"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getAboutPage() {
  const query = `*[_type == "aboutPage"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getRunPage() {
  const query = `*[_type == "runPage"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getImpactPage() {
  const query = `*[_type == "impactPage"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getJiwePage() {
  const query = `*[_type == "jiwePage"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getGetInvolvedPage() {
  const query = `*[_type == "getInvolvedPage"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getContactPage() {
  const query = `*[_type == "contactPage"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getGalleryPage() {
  const query = `*[_type == "galleryPage"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getNews() {
  const query = `*[_type == "news"] | order(date desc)`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getProjects() {
  const query = `*[_type == "project" && removed != true] | order(date desc)`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getFAQ() {
  const query = `*[_type == "faq"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getImpactAreas() {
  const query = `*[_type == "impactArea"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getDonationInfo() {
  const query = `*[_type == "donationInfo"][0]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getInvolvementOptions() {
  const query = `*[_type == "involvementOption"]`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export async function getTestimonials() {
  const query = `*[_type == "testimonial"]`;
  return client.fetch(query, {}, { cache: "no-store" });
}