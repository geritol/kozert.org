import Head from "next/head";

export default function Container(props: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div>
      <Head>
        <title>Közért.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container my-2 mx-auto">
        <div className="mx-2">{props.children}</div>
      </main>
    </div>
  );
}
