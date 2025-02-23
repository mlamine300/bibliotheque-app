import { Button } from "@/components/ui/button";
import { HiArrowSmallLeft } from "react-icons/hi2";
import React from "react";
import NewBookForm from "@/components/admin/forms/NewBookForm";

function page() {
  return (
    <section className="flex flex-col  p-8 bg-transparent">
      <Button className="bg-white shadow-md px-6 py-6 w-fit group hover:bg-primary-admin">
        <HiArrowSmallLeft className="text-dark-200 w-16 h-16 sm:w-10 sm:h-10 group-hover:text-white" />
        <h3 className="text-lg font-[500] max-sm:hidden text-dark-200 group-hover:text-white">
          Go back
        </h3>
      </Button>
      <NewBookForm />
    </section>
  );
}

export default page;
