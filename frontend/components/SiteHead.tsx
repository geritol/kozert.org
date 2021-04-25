import Auth from "frontend/components/Auth";
import Link from "next/link";

export default function SiteHead() {
  return (
    <div className="flex justify-between mb-6">
      <Link href="/">
        <p className="text-lg cursor-pointer">Közért.org</p>
      </Link>
      <Auth />
    </div>
  );
}
