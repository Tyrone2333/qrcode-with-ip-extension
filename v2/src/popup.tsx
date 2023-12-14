import QRCode from "react-qr-code"

import "./style.css"

import { ChangeEvent, useEffect, useState } from "react"
import useSWR from "swr"

import { useStorage } from "@plasmohq/storage/dist/hook"

import { useCurrentURL } from "~hooks/use-current-url"
import { getLocalIPs } from "~lib/ip"

function IndexPopup() {
  const [currentURL, setCurrentURL] = useCurrentURL()
  const [localIp, setLocalIp] = useStorage("local-ip", "")

  const { data: localIps, error, isLoading } = useSWR("local-ips", getLocalIPs)

  useEffect(() => {
    if (!localIps) return
    if (localIps.includes(localIp)) return

    const privateIps = localIps.filter((ip) =>
      /^(10|172\.(1[6-9]|2\d|3[01])|192\.168)\./.test(ip)
    )

    setLocalIp(privateIps[0] ?? localIps[0] ?? "")
  }, [localIp, localIps])

  useEffect(() => {
    if (currentURL.includes("localhost") && localIp) {
      setCurrentURL((prev) => prev.replace("localhost", localIp))
    }
  }, [currentURL, localIp, setCurrentURL])

  const handleOnChangeSelect = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    await setLocalIp(event.target.value)
  }

  const handleOnChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentURL(event.target.value)
  }

  return (
    <div className={"min-w-[300px] flex flex-col space-y-4 p-6"}>
      <QRCode value={currentURL} />

      <select
        value={localIp}
        className={"border border-gray-400 rounded py-1"}
        onChange={handleOnChangeSelect}>
        {isLoading && <option value={""}>Loading...</option>}
        {error && <option value={""}>Error: {error}</option>}
        {localIps?.map((ip) => (
          <option key={ip} value={ip}>
            {ip}
          </option>
        ))}
      </select>

      <textarea
        value={currentURL}
        rows={5}
        className={"w-full text-xs border border-gray-400 rounded py-2 px-3"}
        onChange={handleOnChangeTextarea}
      />
    </div>
  )
}

export default IndexPopup
