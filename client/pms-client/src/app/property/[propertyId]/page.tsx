import React from "react";
import Breadcrumbs from "../../../components/ui/breadcrumbs";
import axios from "axios";
import Image from "next/image";
import { PropertyImageGallery } from "./photo-img-gallery";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "./../../../components/ui/badge";
import {
  Bath,
  DoorClosed,
  Dumbbell,
  Flame,
  Mail,
  Phone,
  Wifi,
} from "lucide-react";
import { ScrollArea } from "../../../components/ui/scrollarea";

type Props = {
  params: {
    propertyId: string;
  };
  searchParams: {
    token: string;
  };
};

const AMENITIES = [
  {
    name: "Wifi",
    identifier: "wifi",
  },
  {
    name: "Swimming Pool",
    identifier: "swimming_pool",
  },
  {
    name: "Fitness Center",
    identifier: "fitness_center",
  },
  {
    name: "Spa And Wellness",
    identifier: "spa_and_wellness",
  },
  {
    name: "Restaurant",
    identifier: "restaurant",
  },
  {
    name: "Room Service",
    identifier: "room_service",
  },
  {
    name: "Bar And Lounge",
    identifier: "bar_and_lounge",
  },
  {
    name: "Parking",
    identifier: "parking",
  },
  {
    name: "Concierge Services",
    identifier: "concierge_services",
  },
  {
    name: "Pet Friendly",
    identifier: "pet_friendly",
  },
  {
    name: "Business Facilities",
    identifier: "business_facilities",
  },
  {
    name: "Laundry Services",
    identifier: "laundry_services",
  },
  {
    name: "Child Friendly Facilities",
    identifier: "child_friendly_facilities",
  },
];

async function fetchProperty(accessToken: string, propertyId: string) {
  const { data } = await axios.get(
    `http://localhost:8040/api/v1/property/${propertyId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
}

export default async function Page({ params, searchParams }: Props) {
  const propertyId = params.propertyId;
  const accessToken = searchParams.token;

  const { data: property } = await fetchProperty(accessToken, propertyId);

  const amenities = Object.keys(property?.property_aminite).filter(
    (key) =>
      key !== "_id" &&
      key !== "propertyInfo" &&
      key !== "__v" &&
      key !== "destination_type" &&
      key !== "property_type" &&
      key !== "no_of_rooms_available"
  );

  return (
    <main className="py-8 px-56">
      <div className="flex items-center justify-between">
        <Breadcrumbs />
      </div>
      <div className="mt-10 flex gap-10">
        <div className="">
          <PropertyImageGallery image={property?.image} />
        </div>
        <ScrollArea className="h-[76vh]">
          <div className="space-y-8">
            <div className="space-y-4">
              <CardDescription className="font-bold">
                # {property?._id}
              </CardDescription>
              <CardTitle>{property.property_name}</CardTitle>
              <CardTitle className="text-muted-foreground flex gap-4">
                <Mail /> {property.property_email}
              </CardTitle>
              <CardTitle className="text-muted-foreground flex gap-4">
                <Phone /> {property.property_contact}
              </CardTitle>
            </div>
            <div className="space-y-4 mt-10">
              <CardTitle>Amenities</CardTitle>
              <div className="flex items-center justify-between gap-20">
                <p className="font-bold">
                  Destination type: {property.property_aminite.destination_type}
                </p>
                <p className="font-bold">
                  Property type: {property.property_aminite.property_type}
                </p>
                <p className="font-bold">
                  No. of rooms available:{" "}
                  {property.property_aminite.no_of_rooms_available}
                </p>
              </div>
              <Card className="w-[500px]">
                <CardHeader>
                  <CardTitle>Other Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 items-center flex-wrap">
                    {amenities.map((key) => {
                      const amenity = AMENITIES.find(
                        (item) => item.identifier === key
                      );

                      const isAvailable = property.property_aminite[key];

                      return amenity ? (
                        <Badge
                          key={key}
                          className={`${
                            !isAvailable &&
                            "bg-muted cursor-not-allowed hover:bg-muted"
                          }`}
                        >
                          {amenity?.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4 mt-10">
              <CardTitle>Rooms</CardTitle>
              <div className="flex items-center flex-wrap justify-between gap-20">
                <p className="font-bold">
                  Room name: {property.property_room.name}
                </p>
                <p className="font-bold">
                  Property type: {property.property_room.type}
                </p>
                <p className="font-bold">
                  Capacity: {property.property_room.capacity}
                </p>
                <p className="font-bold">
                  Price: {property.property_room.price}
                </p>
              </div>
              {/* <Card className="w-[500px]">
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 items-center flex-wrap">
                    {amenities.map((key) => {
                      const amenity = AMENITIES.find(
                        (item) => item.identifier === key
                      );

                      const isAvailable = property.property_aminite[key];

                      return amenity ? (
                        <Badge
                          key={key}
                          className={`${
                            !isAvailable &&
                            "bg-muted cursor-not-allowed hover:bg-muted"
                          }`}
                        >
                          {amenity?.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
