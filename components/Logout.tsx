"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Logout = () => {
  const router = useRouter();
  const handleSignout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/signout");
      toast(res.data.message);
      router.push("/");
    } catch (error: any) {
      toast(error.response?.data?.message);
    }
  };
  return (
    <button
      onClick={handleSignout}
      className="bg-red-950 border border-red-900 text-neutral-200 hover:border-red-950 transition-colors duration-150 cursor-pointer px-2 h-8 rounded-lg text-sm"
    >
      Sign out
    </button>
  );
};

export default Logout;
