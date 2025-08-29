import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl mb-8">Nuqs Errors Reproduction</h1>
      <ul className="list-disc list-inside">
        <li>
          <Link href="/setters" className="underline">
            Go to Setters Reproduction Page
          </Link>
        </li>
        <li>
          <Link href="/reset" className="underline">
            Go to Reset Reproduction Page
          </Link>
        </li>
      </ul>
    </main>
  );
}
