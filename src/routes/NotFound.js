import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack bg="gray.100" justifyContent={"center"} minH="100vh">
      <Heading>Page not found.</Heading>
      <Text>죄송합니다. 페이지를 찾을 수 없습니😴</Text>
      <Link to="/">
        <Button colorScheme={"red"} variant={"link"}>
          Go Home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}