import type { NextPage } from "next";
import QRCode from "react-qr-code";

const Home: NextPage = () => {
  const currentUrl = location.href;

  return (
    <div>
      <QRCode value={currentUrl} />
    </div>
  );
};

export default Home;
