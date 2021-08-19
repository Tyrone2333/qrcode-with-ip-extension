import { useEffect, useState } from "react";
import { getLocalIPs } from "../lib/ip";

export const useLocalIP = (): string | null => {
  const [localIP, setLocalIP] = useState<string | null>(null);
  const [localIPs, setLocalIPs] = useState<string[]>([]);

  useEffect(() => {
    getLocalIPs((ips) => {
      setLocalIPs(ips);
    });
  }, []);

  useEffect(() => {
    const v4Regex = new RegExp(
      /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/
    );
    const defaultValue = localIPs.find((ip) => v4Regex.test(ip));
    if (!localIP && defaultValue) {
      setLocalIP(defaultValue);
    }
  }, [localIP, localIPs]);

  return localIP;
};
