import { createClient, Entry } from "contentful";
import { TypePostSkeleton } from "@/contentful/types";
import {ContentImage, parseContentfulContentImage} from "@/contentful/contentful-image";

const { NEXT_PUBLIC_CONTENTFUL_SPACE_ID, NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN } =
  process.env;

const client = createClient({
  space: NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

type BlogPostEntry = Entry<TypePostSkeleton, undefined, string>;

export interface BlogPost {
  title: string;
  author: string;
  summary?: string;
  image?: ContentImage | null
}

export function parseContentfulBlogPost(
  blogPostEntry?: BlogPostEntry,
): BlogPost | null {
  if (!blogPostEntry) {
    return null;
  }

  return {
    title: blogPostEntry.fields.title || "",
    author: blogPostEntry.fields.author || "",
    summary: blogPostEntry.fields?.summary || "",
    image: parseContentfulContentImage(blogPostEntry.fields.image),
  };
}

export async function getPosts() {
  const blogPostsResult = await client.getEntries<TypePostSkeleton>({
    content_type: "post",
    include: 4,
    order: ["fields.title"],
  });

  return blogPostsResult.items.map(
    (blogPostEntry) => parseContentfulBlogPost(blogPostEntry) as BlogPost,
  );
}
