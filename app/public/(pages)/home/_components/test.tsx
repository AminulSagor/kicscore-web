"use client";

import Accordion from "@/components/UI/accordion/accordion";
import Button from "@/components/UI/buttons/button";
import Dialog from "@/components/UI/dialogs/dialog";
import { useState } from "react";

const Test = () => {
  const [open, setOpen] = useState(false);
  const title = "Accordion Title";
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Hello</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        hello
      </Dialog>
      <div className="mt-10 " />
      <Accordion title={title}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
      </Accordion>
    </div>
  );
};

export default Test;
