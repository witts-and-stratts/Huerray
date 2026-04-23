import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

export const HELP_CENTER_QUERY = defineQuery(`
  *[_type == "helpCenter" && audience == $audience][0] {
    _id,
    audience,
    heroTitle,
    heroSubtitle,
    cards[] {
      title,
      description,
      icon
    }
  }
`);

export async function getHelpCenterData(audience: "admin" | "creator" | "brand") {
  const { data } = await sanityFetch({
    query: HELP_CENTER_QUERY,
    params: { audience },
    tags: ['helpCenter', `helpCenter:${audience}`],
  });
  return data;
}
