import { useEffect } from "react"
import useSWR from "swr"

import { useStorage } from "@plasmohq/storage/dist/hook"

import { getLocalIPs } from "~lib/ip"

export const useLocalIP = () => {
  const [localIP, setLocalIP] = useStorage("local-ip", "")

  const { data: options, error, isLoading } = useSWR("local-ips", getLocalIPs)

  useEffect(() => {
    if (!options) return
    if (options.includes(localIP)) return

    const privateIps = options.filter((ip) =>
      /^(10|172\.(1[6-9]|2\d|3[01])|192\.168)\./.test(ip)
    )

    setLocalIP(privateIps[0] ?? options[0] ?? "")
  }, [localIP, options])

  return { localIP, setLocalIP, options, error, isLoading }
}
