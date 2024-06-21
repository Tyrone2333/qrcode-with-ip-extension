import QRCode from "react-qr-code"
import "./style.css"
import {ChangeEvent, useState, useEffect} from "react"
import {useCurrentURL} from "~hooks/use-current-url"
import {useLocalIP} from "~hooks/use-local-ip"

function IndexPopup() {
  const [currentURL, setCurrentURL] = useCurrentURL()
  const {localIP, setLocalIP, options, error, isLoading} = useLocalIP()

  const [replacedURL, setReplacedURL] = useState('')
  const [currentOption, setCurrentOption] = useState('')
  const [isReplaced, setIsReplaced] = useState(false)

  useEffect(() => {
    if (currentURL) {
      setReplacedURL(currentURL)
    }
    if (currentURL && options && options.length > 0) {
      if (/localhost/.test(currentURL)) {
        handleReplace(options[0])
      }
      setCurrentOption(options[0]) // 设置默认选项为第一个选项
    }
  }, [currentURL, options])

  const handleOnChangeSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    setCurrentOption(selectedValue)
    if (isReplaced) {
      handleReplace(selectedValue)
    }
  }

  const handleReplace = (selectedOption = currentOption) => {
    try {
      const url = new URL(currentURL)
      const port = url.port // 保存当前端口号
      url.hostname = selectedOption // 替换主机名部分
      if (port) {
        url.port = port
      }
      const newURL = url.toString()
      setReplacedURL(newURL)
      setIsReplaced(true)
    } catch (e) {
      console.log("Invalid URL", e)
      handleRestore()
    }
  }

  const handleRestore = () => {
    setReplacedURL(currentURL)
    setIsReplaced(false)
  }

  const handleOnChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    setReplacedURL(newText)

  }

  return (
    <div className='min-w-[300px] flex flex-col space-y-4 p-6'>
      <QRCode value={replacedURL}/>

      <div className='container flex'>
        <select
          value={currentOption}
          className='border border-gray-400 rounded py-1 w-3/4'
          onChange={handleOnChangeSelect}
        >
          {isLoading && <option value=''>Loading...</option>}
          {error && <option value=''>Error: {error}</option>}
          {options?.map((ip) => (
            <option key={ip} value={ip}>
              {ip}
            </option>
          ))}
        </select>

        <button onClick={isReplaced ? handleRestore : () => handleReplace(currentOption)} className='replace-button w-1/4'>
          {isReplaced ? 'Restore' : 'Replace'}
        </button>
      </div>

      <textarea
        value={replacedURL}
        rows={5}
        className='w-full text-xs border border-gray-400 rounded py-2 px-3'
        onChange={handleOnChangeTextarea}
      />
    </div>
  )
}

export default IndexPopup
