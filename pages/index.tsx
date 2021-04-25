import Auth from "frontend/components/Auth";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Közért.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto text-center my-2">
        <div className="flex justify-between">
          <p className="text-lg">Közért.org</p>
          <Auth />
        </div>
        <h1 className="text-4xl mt-24">Welcome to Közért!</h1>
        <p className="mt-8 text-lg">
          Közért is an open source online platform that helps NGOs <br /> to
          recruit volunteers for their projects.
        </p>

        <p className="mt-6">
          The project is under development, help us on{" "}
          <a
            className="text-blue-500 hover:underline"
            href="https://github.com/geritol/kozert.org"
            target="__blank"
          >
            Github
          </a>
        </p>
      </main>
    </div>
  );
}
