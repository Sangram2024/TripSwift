import CreatePropertyForm from "../components/create-property-form";

type Props = {
  searchParams: {
    auth?: string;
  };
};

export default function Home(props: Props) {
  const auth = props.searchParams?.auth;

  return <main className=""></main>;
}
