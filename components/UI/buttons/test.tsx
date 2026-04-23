"use client";

import toast from "react-hot-toast";

const test = () => {
  return (
    <button
      onClick={() => toast.success("Saved successfully")}
      className="rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black w-44"
    >
      Show Toast
    </button>
  );
};

export default test;
