import React from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";
async function page() {
  return (
    <section className="flex flex-col p-4 font-ibm-plex-sans">
      <div className="flex justify-stretch gap-6">
        <div className="flex flex-col w-full rounded-xl p-5 gap-3 bg-white">
          <div className="flex">
            <h3 className=" mr-3 items-center text-gray-600 text-base font-medium">
              Barrowed Books
            </h3>
            <TbTriangleInvertedFilled className="text-orange-600 w-4 h-4 mr-1" />
            <h3 className="text-orange-500 text-base font-medium">2</h3>
          </div>
          <h3 className="text-3xl font-semibold text-dark-100">145</h3>
        </div>

        <div className="flex flex-col w-full rounded-xl p-5 gap-3 bg-white">
          <div className="flex">
            <h3 className=" mr-3 items-center text-gray-600 text-base font-medium">
              Total Users
            </h3>
            <TbTriangleInvertedFilled className="text-green-600 w-4 h-4 mr-1" />
            <h3 className="text-green-500 text-base font-medium">4</h3>
          </div>
          <h3 className="text-3xl font-semibold text-dark-100">145</h3>
        </div>

        <div className="flex w-full flex-col rounded-xl p-5 gap-3 bg-white">
          <div className="flex">
            <h3 className=" mr-3 items-center text-gray-600 text-base font-medium">
              Total Books
            </h3>
            <TbTriangleInvertedFilled className="text-green-600 w-4  h-4 mr-1" />
            <h3 className="text-green-500 text-base font-medium">2</h3>
          </div>
          <h3 className="text-3xl font-semibold text-dark-100">145</h3>
        </div>
      </div>
    </section>
  );
}

export default page;
