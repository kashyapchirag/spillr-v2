import Posts from "@/components/Posts";
import { dbConnecttion } from "@/lib/db";
import { Post } from "@/models/Post";
import { revalidatePath } from "next/cache";

export const createPost = async (formData: FormData) => {
  "use server";
  const title = formData.get("title");
  const post = formData.get("post");

  await dbConnecttion();

  await Post.create({ title, blog: post });
  revalidatePath("/dashboard");
};

const page = () => {
  const name = "Chirag";

  return (
    <div className="p-5 text-white">
      <>
        <div className="head flex justify-between">
          <h1 className="font-semibold text-4xl font-mono italic text-neutral-300">
            Hey {name}...
          </h1>
          <button
            // onClick={handleSignout}
            className="bg-red-950 border border-red-900 text-neutral-200 hover:border-red-950 transition-colors duration-150 cursor-pointer px-2 h-8 rounded-lg text-sm"
          >
            Sign out
          </button>
        </div>

        <div className="description mt-3 font-mono text-sm text-neutral-400">
          Write a blog here. Describe your day 😊
        </div>

        <form
          action={createPost}
          className="write-a-post flex flex-col items-start gap-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Title for your Blog Post"
            required
            className="bg-neutral-800 font-mono mt-3 text-sm outline-none rounded-md min-w-200 px-3 py-2"
          />
          <textarea
            name="post"
            placeholder="Start writing"
            required
            className="bg-neutral-800 font-mono text-sm outline-none rounded-md min-h-30 resize-none min-w-200 px-3 py-2"
          />
          <button className="bg-green-950 border hover:border-green-950 text-neutral-200 border-green-800 transition-colors duration-150 px-3 py-1 rounded-lg cursor-pointer">
            Save
          </button>
        </form>
      </>
      <>
        <div className="postGallery w-full">
          <Posts />
        </div>
      </>
    </div>
  );
};

export default page;
