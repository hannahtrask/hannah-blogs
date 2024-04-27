import { Header } from "@/app/components/header/header";
import { Footer } from "@/app/components/footer/footer";
import { getPosts } from "@/contentful/contentful";
import { Button, Paper, Title, Text } from "@mantine/core";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <Header />
      <div className="blog">
        {posts && posts.map((post, index) => {
          return (
            <Paper
              shadow="md"
              p="xl"
              radius="md"
              className="card"
              key={index}
              style={{
                backgroundImage: `url(${post?.image?.src})`,
              }}
            >
              <div>
                <Text className="category" size="xs">
                  {post.title}
                </Text>
                <Title order={3} className="title">
                  {post.summary}
                </Title>
              </div>
              <Button variant="white" color="dark">
                read more ...
              </Button>
            </Paper>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
