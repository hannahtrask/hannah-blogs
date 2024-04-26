import { getPosts } from "@/contentful/contentful";

export async function Main() {
  const posts = await getPosts();
  console.log(posts)

  return <div>Hey</div>;
}
