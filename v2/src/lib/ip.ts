export const getLocalIPs = async (): Promise<string[] > => {
  const ips: string[] = []

  return new Promise((resolve, reject) => {
    const pc = new RTCPeerConnection({ iceServers: [] })
    pc.createDataChannel("")
    pc.createOffer().then((offer) => pc.setLocalDescription(offer))

    pc.onicecandidate = (ice) => {
      if (ice.candidate && ice.candidate.candidate) {
        const candidate = ice.candidate.candidate.split(" ")
        const ip = candidate[4]

        ips.push(ip)
      } else {
        resolve(ips)
        pc.close()
      }
    }

    pc.onicecandidateerror = (error) => {
      reject(error)
      pc.close()
    }
  })
}
