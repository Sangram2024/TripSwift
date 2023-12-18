"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../../components/ui/button";
import { LandPlot, MapPinned, User } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {};

const PROFILE_NAVLINKS = [
  {
    title: "Profile",
    link: "http://localhost:3000/profile",
    icon: <User size={16} />,
  },
  {
    title: "Property",
    link: "http://localhost:3000/profile/property",
    icon: <LandPlot size={16} />,
  },
  {
    title: "Address",
    link: "http://localhost:3000/profile/address",
    icon: <MapPinned size={16} />,
  },
];

export default function ProfileNav({}: Props) {
  const pathname = usePathname();

  const activePath = PROFILE_NAVLINKS.filter(
    (link) => link.title.toLowerCase() === pathname.split("/")[1]
  )[0];

  return (
    <nav className="flex flex-col border-r-2 pr-2 space-y-2">
      {PROFILE_NAVLINKS?.map((link) => (
        <Navitem
          activePath={activePath}
          title={link?.title}
          link={link?.link}
          icon={link?.icon}
        />
      ))}
    </nav>
  );
}

function Navitem({
  title,
  link,
  icon,
  activePath,
}: {
  title: string;
  link: string;
  icon: React.ReactNode;
  activePath: {
    title: string;
    link: string;
    icon: React.ReactNode;
  };
}) {
  return (
    <Link href={link}>
      <Button
        variant={activePath.title === title ? "secondary" : "ghost"}
        className="w-[150px] gap-4 justify-start flex items-center"
      >
        {icon} {title}
      </Button>
    </Link>
  );
}
