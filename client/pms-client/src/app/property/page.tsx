import React from "react";
import Breadcrumbs from "./../../components/ui/breadcrumbs";
import PropertySlide from "./property-slide";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

type Props = {};

export default function Property({}: Props) {
  return (
    <main className="py-8 px-56">
      <div className="flex items-center justify-between">
        <Breadcrumbs />
        <Link href={"/property/create"}>
          <Button variant={"outline"}>
            <Plus size={16} strokeWidth={2.5} className="mr-2" />
            Create
          </Button>
        </Link>
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <PropertySlide />
      </div>
    </main>
  );
}
