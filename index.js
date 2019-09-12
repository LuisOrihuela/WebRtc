navigator.mediaDevices.getUserMedia(
  {
    video: true,
    audio: false
  },
  stream => {
    let Peer = require("simple-peer");
    let peer = new Peer({
      initiator: location.hash === "#init",
      trickle: false,
      stream: stream
    });

    //Listen for an event, signal from the peer
    //data: what the peer is capable of...
    peer.on("signal", data => {
      console.log("Signal received");
      document.getElementById("yourId").value = JSON.stringify(data);
    });

    document.getElementById("connect").addEventListener("click", () => {
      var otherId = JSON.parse(document.getElementById("otherId").value);
      peer.signal(otherId);
    });

    document.getElementById("send").addEventListener("click", () => {
      let yourMessage = document.getElementById("yourMessage").value;
      peer.send(yourMessage);
    });

    peer.on("data", data => {
      document.getElementById("messages").textContent += data + "\n";
    });
    peer.on("stream", stream => {
      let video = document.createElement("video");
      document.body.appendChild(video);

      video.src = window.URL.createObjectURL(stream);
      video.play();
    });
  },
  err => {
    console.log(err);
  }
);
