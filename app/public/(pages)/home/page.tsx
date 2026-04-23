import Test from "@/app/public/(pages)/home/_components/test";
import Card from "@/components/UI/cards/card";

const home = () => {
  return (
    <div className="px-4 py-4 flex flex-col gap-4">
      <h1>Public home</h1>

      <div className="mt-10">
        <Card>hello cared</Card>
      </div>

      <Test />
    </div>
  );
};

export default home;
