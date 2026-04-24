import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

export const HELP_CENTER_QUERY = defineQuery(`
  *[_type == "helpCenter" && audience == $audience][0] {
    _id,
    audience,
    heroTitle,
    heroSubtitle,
    "topics": *[_type == "helpTopic" && audience == $audience] | order(orderRank asc, _createdAt asc) {
      _id,
      audience,
      topicId,
      orderRank,
      "slug": slug.current,
      title,
      description,
      icon,
      actionItems[] {
        text
      },
      quickLinks[] {
        label,
        href
      },
      relatedFaqs[]->{
        _id,
        question,
        answer,
        audience,
        category->{
          _id,
          title
        }
      }
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
