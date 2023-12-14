import { useEffect, useState } from "react"

export const useCurrentURL = () => {
  const [currentURL, setCurrentURL] = useState<string>("")

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab.url) {
        setCurrentURL(tab.url)
      }
    })
  }, [])

  return [currentURL, setCurrentURL] as const
}
