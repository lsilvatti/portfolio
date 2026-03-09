import { Typography, Link } from "@/components/atoms";

export default function Home() {
  return (
    <>
      <Typography variant="h1" className="text-center">
        🚧Under Construction
      </Typography>
      <Typography variant="h2" className="text-center">
        This page is currently under construction. You can still check my connections <Link href="/connect">here</Link>.
      </Typography>
    </>
  );
}
