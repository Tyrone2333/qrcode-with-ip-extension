import QRCode from "react-qr-code"

import "./style.css"

import { ChangeEvent } from "react"

import { useCurrentURL } from "~hooks/use-current-url"
import { useLocalIP } from "~hooks/use-local-ip"

function IndexPopup() {
  const [currentURL, setCurrentURL] = useCurrentURL()
  const { localIP, setLocalIP, options, error, isLoading } = useLocalIP()

  const replacedURL = currentURL.replace("localhost", localIP)

  const handleOnChangeSelect = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    await setLocalIP(event.target.value)
  }

  const handleOnChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentURL(event.target.value)
  }

  return (
    <div className={"min-w-[300px] flex flex-col space-y-4 p-6"}>
      <QRCode value={replacedURL} />

      <select
        value={localIP}
        className={"border border-gray-400 rounded py-1"}
        onChange={handleOnChangeSelect}>
        {isLoading && <option value={""}>Loading...</option>}
        {error && <option value={""}>Error: {error}</option>}
        {options?.map((ip) => (
          <option key={ip} value={ip}>
            {ip}
          </option>
        ))}
      </select>

      <textarea
        value={replacedURL}
        rows={5}
        className={"w-full text-xs border border-gray-400 rounded py-2 px-3"}
        onChange={handleOnChangeTextarea}
      />
    </div>
  )
}

export default IndexPopup
