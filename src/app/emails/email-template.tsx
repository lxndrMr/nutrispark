import { Button } from "@react-email/button";
import { Heading } from "@react-email/heading";
import { Html } from "@react-email/html";
import { Container } from "@react-email/container";
import { Text } from "@react-email/text";
import { Head } from "@react-email/head";
import { Tailwind } from "@react-email/tailwind";

const WelcomeTemplate = ({ email = "example@example.com" }: { email: string }) => (
  <Tailwind>
    <Html className="bg-white font-sans">
      <Head>
        <title>Send Email - Welcome</title>
      </Head>
      <Container>
        <Heading>Welcome!</Heading>
        <Text>You signed up with the following email : {email}</Text>
        <Button
          href="http://localhost:3000/"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            fontWeight: "500",
          }}
        >
          Go back to the app
        </Button>
      </Container>
    </Html>
  </Tailwind>
);

export default WelcomeTemplate;
