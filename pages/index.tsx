import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Közért.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto text-center">
        <h1 className="text-4xl mt-24">Welcome to Közért!</h1>
      </main>
    </div>
  );
}
