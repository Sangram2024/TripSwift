import CreatePropertyForm from "../components/create-property-form";

type Props = {
  searchParams: {
    auth?: string;
  };
};

export default function Home(props: Props) {
  const auth = props.searchParams?.auth;

  const isPropertyThere = false;

  return (
    <main className="">{!isPropertyThere ? <CreatePropertyForm /> : null}</main>
  );
}
