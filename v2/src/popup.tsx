import QRCode from "react-qr-code"

import "./style.css"

import { ChangeEvent, useEffect } from "react"

import { useCurrentURL } from "~hooks/use-current-url"
import { useLocalIP } from "~hooks/use-local-ip"

function IndexPopup() {
  const [currentURL, setCurrentURL] = useCurrentURL()
  const localIP = useLocalIP()

  useEffect(() => {
    if (currentURL.includes("localhost") && localIP) {
      setCurrentURL((prev) => prev.replace("localhost", localIP))
    }
  }, [currentURL, localIP, setCurrentURL])

  const handleOnChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentURL(event.target.value)
  }

  return (
    <div className={"min-w-[300px] flex flex-col space-y-4 p-6"}>
      <QRCode value={currentURL} />

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
