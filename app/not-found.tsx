import Link from "next/link";
import { PageHero } from "@/components/Blocks";

export default function NotFound() {
  return (
    <PageHero label="404 · Page not found" title="This bridge doesn't go anywhere." lede="The page you're looking for has moved or never existed.">
      <div className="btn-row">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Tell us what you were looking for
        </Link>
      </div>
    </PageHero>
  );
}
