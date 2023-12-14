import { useEffect, useState } from "react";
import { getLocalIPs } from "../lib/ip";

export const useLocalIP = (): string | null => {
  const [localIP, setLocalIP] = useState<string | null>(null);

  useEffect(() => {
    const getLocalIP = async () => {
      const localIPS = await getLocalIPs();
      const localPrivateIps = localIPS.filter((ip) =>
        /^(10|172\.(1[6-9]|2\d|3[01])|192\.168)\./.test(ip)
      );

      setLocalIP(localPrivateIps[0] ?? null);
    };

    getLocalIP();
  }, []);

  return localIP;
};
