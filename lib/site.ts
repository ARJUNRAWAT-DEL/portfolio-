// The fallback is the homepage configured on the connected GitHub repository.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://portfolio-theta-pearl-11.vercel.app"
).replace(/\/$/, "");
