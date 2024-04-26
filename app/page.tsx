import { Header } from "@/app/components/header/header";
import { Footer } from "@/app/components/footer/footer";
import { getPosts } from "@/contentful/contentful";

export default async function Home() {
  console.log("hey");
  const posts = await getPosts();
  console.log(posts);
  posts.map((hey) => console.log(hey));

  return (
    <>
      <Header />
      <div>
        <h1>My Contentful Blog</h1>
        <ul>
          {posts.map((post) => {
            return <li>{post.author}</li>;
          })}
        </ul>
      </div>
      <Footer />
    </>
  );
}
