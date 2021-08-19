import type { NextPage } from "next";
import QRCode from "react-qr-code";
import { ChangeEvent, useEffect } from "react";
import { Skeleton, Textarea, VStack } from "@chakra-ui/react";
import { useCurrentURL } from "../hooks/useCurrentURL";
import { useLocalIP } from "../hooks/useLocalIP";

const Home: NextPage = () => {
  const [currentURL, setCurrentURL] = useCurrentURL();
  const localIP = useLocalIP();

  useEffect(() => {
    if (currentURL.includes("localhost") && localIP) {
      setCurrentURL((prev) => prev.replace("localhost", localIP));
    }
  }, [currentURL, localIP, setCurrentURL]);

  const handleOnChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentURL(event.target.value);
  };

  return (
    <VStack p={6} spacing={4}>
      <Skeleton isLoaded={currentURL !== ""}>
        <QRCode value={currentURL} />
      </Skeleton>

      <Textarea
        rows={5}
        fontSize="xs"
        value={currentURL}
        onChange={handleOnChangeTextarea}
      />
    </VStack>
  );
};

export default Home;
