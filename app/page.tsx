import { redirect } from "next/navigation";

const page = () => {
  return redirect("/public/home");
};

export default page;
