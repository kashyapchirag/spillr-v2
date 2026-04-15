import { dbConnecttion } from "@/lib/db";
import { Post } from "@/models/Post";

const Posts = async () => {
  await dbConnecttion();
  const posts = await Post.find();
  return (
    <div className="flex justify-center flex-wrap gap-5 p-5">
      {posts.map((post: { _id: string; title: string; blog: string }, idx) => {
        return (
          <div
            key={post._id}
            className="min-w-60 min-h-30 font-mono bg-neutral-700 border border-neutral-600 rounded-lg p-2"
          >
            <h2 className="text-[1.2rem]">{post.title}</h2>
            <p className="text-sm text-neutral-300">{post.blog}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
