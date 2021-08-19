export const getLocalIPs = (callback: (ips: string[]) => void) => {
  if (!process.browser) return;

  const ips: string[] = [];

  const RTCPeerConnection =
    window.RTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    // @ts-ignore
    window.mozRTCPeerConnection;

  const pc = new RTCPeerConnection({
    iceServers: [],
  });

  pc.createDataChannel("");

  pc.createOffer().then((offerSDP) => {
    pc.setLocalDescription(offerSDP);
  });

  pc.onicecandidate = function (e) {
    if (!e.candidate) {
      pc.close();
      callback(ips);
      return;
    }

    const ip = new RegExp(/^candidate:.+ (\S+) \d+ typ/).exec(
      e.candidate.candidate
    )?.[1];
    if (ip && ips.indexOf(ip) === -1) ips.push(ip);
  };
};
