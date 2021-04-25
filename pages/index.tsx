import Projects from "frontend/components/Projects";
import SiteHead from "frontend/components/SiteHead";
import Container from "frontend/components/Container";

export default function Home() {
  return (
    <Container>
      <SiteHead />
      <div className="text-center">
        <h1 className="text-4xl mt-20">Welcome to Közért!</h1>
        <p className="mt-8 text-lg">
          Közért is an open source online platform that helps NGOs <br /> to
          recruit volunteers for their projects.
        </p>

        <p className="mt-6 mb-20">
          The project is under development, help us on{" "}
          <a
            className="text-blue-500 hover:underline"
            href="https://github.com/geritol/kozert.org"
            target="__blank"
          >
            Github
          </a>
        </p>
      </div>
      <Projects />
    </Container>
  );
}
