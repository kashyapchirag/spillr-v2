import Logout from "@/components/Logout";
import Posts from "@/components/Posts";
import { getUser } from "@/lib/auth";
import { dbConnecttion } from "@/lib/db";
import { Post } from "@/models/Post";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData) => {
  "use server";
  const title = formData.get("title");
  const post = formData.get("post");

  await dbConnecttion();

  await Post.create({ title, blog: post });
  revalidatePath("/dashboard");
};

const page = async () => {
  const name = "Chirag";

  const user = await getUser();
  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="p-5 text-white">
      <>
        <div className="head flex justify-between">
          <h1 className="font-semibold text-4xl font-mono italic text-neutral-300">
            Hey {name}...
          </h1>
          <Logout />
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
