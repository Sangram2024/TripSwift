import React from "react";
import Breadcrumbs from "./../../components/ui/breadcrumbs";
import PropertySlide from "./property-slide";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { RootState, store, useSelector } from "../../redux/store";
import axios from "axios";

type Props = {
  searchParams: {
    token: string;
  };
};

async function fetchProperties(accessToken: string) {
  const { data } = await axios.get("http://localhost:8040/api/v1/property/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const { properties, draftProperties } = data.data;
  return { properties, draftProperties };
}

export default async function Property({ searchParams }: Props) {
  const accessToken = searchParams.token;
  const { properties } = await fetchProperties(accessToken);

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
        <PropertySlide properties={properties} />
      </div>
    </main>
  );
}
