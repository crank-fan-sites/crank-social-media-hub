import { useEffect, useState } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/facebookTimeline");
      const data = await res.json();
      setPosts(data.data); // Assuming the API returns the posts in a `data` field
    }

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <p>{post.message}</p> {/* Displaying the message of each post */}
        </div>
      ))}
    </div>
  );
};

export default Home;
