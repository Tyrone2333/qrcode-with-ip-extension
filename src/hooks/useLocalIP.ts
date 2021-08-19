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
    const defaultValue = localIPs[0];
    if (!localIP && defaultValue) {
      setLocalIP(defaultValue);
    }
  }, [localIP, localIPs]);

  return localIP;
};
