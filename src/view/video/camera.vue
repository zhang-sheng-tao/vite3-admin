<template>
  <div>
    <video id="video"></video>
    <video ref="remoteVideo" id="remoteVideo"></video>
  </div>
</template>
<script setup name="camera">
function muted() {
  document.getElementById("video").play();
}
// 请求一个可用的媒体输入和输出设备的列表，例如麦克风，摄像机，耳机设备等
navigator.mediaDevices.enumerateDevices().then((devices) => {
  let videoDevices = devices.filter((item) => item.kind === "videoinput"); // item.deviceId 设备唯一ID
  console.log("设备列表", devices, "摄像头设备的列表", videoDevices);
  //   constraints.video.deviceId.exact = videoDevices[0].deviceId;
});

const pc = new RTCPeerConnection();
const remoteVideo = ref(null);
pc.ontrack = (event) => {
  remoteVideo.value.srcObject = event.streams[0];
};

// 创建本地/远程 SDP 描述, 用于描述本地/远程的媒体流
let offerSdp = ref("");
let answerSdp = "";

async function createOffer() {
  // 创建 offer
  const offer = await pc.createOffer();
  // 设置本地描述
  await pc.setLocalDescription(offer);
  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      offerSdp.value = JSON.stringify(pc.localDescription);
    }
  };
}

async function createAnswer() {
  // 解析字符串
  const offer = JSON.parse(offerSdp);

  pc.onicecandidate = async (event) => {
    // Event that fires off when a new answer ICE candidate is created
    if (event.candidate) {
      answerSdp = JSON.stringify(pc.localDescription);
    }
  };
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
}

const addAnswer = async () => {
  const answer = JSON.parse(answerSdp);
  if (!pc.currentRemoteDescription) {
    pc.setRemoteDescription(answer);
  }
};

const auth = navigator.mediaDevices.getSupportedConstraints(); // 获取浏览器支持的约束属性
// auth中的属性就是constraints支持的属性
function getUserMedia(constraints) {
  return navigator.mediaDevices.getUserMedia(constraints);
}

const constraints = {
  audio: true,
  video: {
    // width: { min: 1024, ideal: 1280, max: 1920 },
    // height: { min: 721, ideal: 720, max: 1080 },
    frameRate: { ideal: 30, max: 60 }, // 设置帧率
    facingMode: "left", //移动端设置摄像头方向   user前、environment后，left、right）
    // deviceId: { exact: "" },
  },
};
function streamFn(stream) {
  const video = document.getElementById("video");
  setTimeout(() => {
    video.srcObject = stream;
    video.play();
  }, 0);
  stream.getTracks().forEach((track) => {
    pc.addTrack(track, stream);
  });
}

onMounted(() => {
  getUserMedia(constraints)
    .then((stream) => {
      streamFn(stream);
      createOffer();
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
});
</script>
<style lang="scss" scoped>
// #video {
//   width: 200px;
//   height: 200px;
// }
</style>
