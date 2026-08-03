export async function getYoutubeVideos() {
  const res = await fetch("/api/youtube/videos", { cache: "no-store" });
  if (!res.ok) return { videos: [], channelUrl: "https://www.youtube.com/@GladysErudeOrganization/videos" };
  return res.json();
}