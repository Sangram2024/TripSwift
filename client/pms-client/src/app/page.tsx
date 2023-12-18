import CreatePropertyForm from "../components/create-property-form";
import {
  Card as NextUICard,
  CardFooter as NextUICardFooter,
  Button as NextUIButton,
  Tooltip,
} from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import PropertySlide from "./property/property-slide";

type Props = {
  searchParams: {
    auth?: string;
  };
};

export default function Home(props: Props) {
  const auth = props.searchParams?.auth;

  return (
    <main className="py-8 px-8">
      <Card className="">
        <CardHeader>
          <CardTitle>My Properties</CardTitle>
          <CardDescription>Manager your properties</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex gap-4 relative">
            <PropertySlide />
            <div className="bg-gradient-to-r right-0 rounded-tr-lg rounded-br-lg from-transparent from-10% via-black via-90% to-black h-full absolute w-20 z-[99]">
              &nbsp;
            </div>
          </div>
          <div className="flex items-center">
            <Tooltip content="View More">
              <NextUIButton isIconOnly variant="ghost" className="rounded-full">
                <ChevronRight size={28} />
              </NextUIButton>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
