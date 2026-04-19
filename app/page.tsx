import Link from "next/link";
const page = () => {
  console.log("hello world");
  return (
    <div className="h-full w-full">
      <div className="text-white">Welcome</div>

      <Link href={"/auth"} className="px-3 py-2 bg-blue-300">
        Auth
      </Link>
      <Link href={"/dashboard"} className="px-3 py-2 bg-blue-300">
        Dashboard
      </Link>
    </div>
  );
};

export default page;
