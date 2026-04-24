import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

export const FAQS_QUERY = defineQuery(`
  *[_type == "faq" && audience == $audience] | order(orderRank asc, _createdAt desc) {
    _id,
    question,
    answer,
    audience,
    category->{
      _id,
      title
    }
  }
`);

export async function getFaqs(audience: "admin" | "creator" | "brand") {
  const { data } = await sanityFetch({
    query: FAQS_QUERY,
    params: { audience },
    tags: ['faq', `faq:${audience}`, 'category'],
  });
  return data;
}
