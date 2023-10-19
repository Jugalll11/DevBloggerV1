"use client";
import { Tab } from "@headlessui/react";
import Register from "./register";
import Login from "./login";

function home() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="w-full max-w-md px-2 sm:px-0 m-auto mt-0">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 my-10">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-slate-800",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Register
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className='flex center'>
            <Register />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default home;
