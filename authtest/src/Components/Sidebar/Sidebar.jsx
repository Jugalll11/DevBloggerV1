"use client";
import { useState } from "react";
import Image from "next/image";
import "./Sidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  UilEnvelope,
  UilEstate,
  UilUsersAlt,
  UilUser,
  UilSearchAlt,
} from "@iconscout/react-unicons";

const Sidebar = ({ name, img, username }) => {
  const SidebarData = [
    {
      icon: UilEstate,
      heading: "Home",
      url: "/home",
    },
    {
      icon: UilSearchAlt,
      heading: "Search",
      url: "/Search",
    },
    {
      icon: UilUsersAlt,
      heading: "Add Post",
      url: "/Add",
    },
    {
      icon: UilEnvelope,
      heading: "Chat",
      url: "/Chat",
    },
    {
      icon: UilUser,
      heading: "Profile",
      url: "/Profile/" + username,
    },
  ];

  const router = useRouter();
  const [expanded, setExpaned] = useState(false);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  console.log("pfp", img);
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars
          style={{
            background: "rgba(17, 21, 146, 0.6)",
            padding: "7px",
            borderRadius: "50px",
          }}
        />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        <div className="logo">
          <Image src={img} width={300} height={300} />
          <span>{name}</span>
        </div>
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={"menuItem"}
                key={index}
                onClick={() => {
                  router.push(item.url);
                }}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          {/* signoutIcon */}
          <div
            className="menuItem"
            onClick={() => {
              router.push("/api/auth/signout");
            }}
          >
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default Sidebar;
