<template>
  <div class="cameras">
    <video class="isMy" autoplay muted ref="isMy"></video>
    <video class="farEnd" autoplay muted ref="farEnd"></video>
  </div>
</template>
<script setup name="cameras">
import io from "socket.io-client";
const pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.voipbuster.com ",
    },
  ],
});

const userId = Math.random().toString(36).substring(2);
const roomId = ref("");
const socket = io("https://192.168.168.145:5550");
const isMy = ref(null);
const farEnd = ref(null);

function init() {
  const constraints = {
    audio: {
      // volume: 0.8,// 音量0-1
      // sampleRate: 16000,
      noiseSuppression: true, // 降噪
      echoCancellation: true, // 回音消除
    },
    video: {
      // width: { min: 1024, ideal: 1280, max: 1920 },
      // height: { min: 721, ideal: 720, max: 1080 },
      frameRate: { ideal: 100, max: 150 }, // 设置帧率
      facingMode: "left", //移动端设置摄像头方向   user前、environment后，left、right）
      // deviceId: { exact: "" },
    },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      setTimeout(() => {
        isMy.muted = false;
      }, 0);
      isMy.value.srcObject = stream;
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
      // 监听远端视频流
      pc.ontrack = (event) => {
        farEnd.value.srcObject = event.streams[0];
      };
    })
    .catch((err) => {
      let message = "找不到摄像头";
      if (err.toString().indexOf("Could not start video source") >= 0) {
        message = "摄像头被占用";
      }
      console.log(err);
      ElMessage({
        type: "error",
        message,
      });
    });
}

// 连接成功时触发
socket.on("connect", () => {
  console.log("链接成功");
});

socket.emit("join", { userId: "随机", roomId: 1231412414124 });

socket.on("error", (data) => {
  console.log("error", data);
});
socket.on("welcome", (data) => {
  console.log("welcome", data);
});
socket.on("createOffer", (data) => {
  console.log("createOffer", data);
});
</script>
<style lang="scss" scoped>
.cameras {
  width: 100%;
  .isMy {
    width: 500px;
    height: 400px;
  }
  .farEnd {
    width: 500px;
    height: 400px;
  }
}
</style>
