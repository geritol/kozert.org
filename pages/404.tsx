import SiteHead from "frontend/components/SiteHead";
import Container from "frontend/components/Container";
import Error from "next/error";

export default function Custom404() {
  return (
    <Container>
      <div style={{ height: "95vh", overflowY: "hidden" }}>
        <SiteHead />
        <Error statusCode={404} />
      </div>
    </Container>
  );
}
