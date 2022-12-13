<template>
  <div class="camera">
    <video autoplay muted ref="video"></video>
    <video autoplay muted ref="remoteVideo"></video>
    <div>
      <el-input v-model="offerSdp" clearable>
        <template #prepend>本地offer</template>
        <template #append>
          <el-button type="primary" @click="createOffer">创建</el-button>
        </template>
      </el-input>

      <el-input v-model="offerSdp2" clearable>
        <template #prepend>远端offer</template>
        <template #append>
          <el-button type="primary" @click="createAnswer">创建应答</el-button>
        </template>
      </el-input>
      <el-input v-model="answerSdp" clearable>
        <template #prepend>应答</template>
      </el-input>

      <el-input v-model="answerSdp2" clearable>
        <template #prepend>
          <el-button type="primary" @click="addAnswer">创建应答</el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>
<script setup name="camera">
import { onBeforeUnmount } from "vue-demi";

// 请求一个可用的媒体输入和输出设备的列表，例如麦克风，摄像机，耳机设备等
navigator.mediaDevices.enumerateDevices().then((devices) => {
  let videoDevices = devices.filter((item) => item.kind === "videoinput"); // item.deviceId 设备唯一ID
  console.log("设备列表", devices, "摄像头设备的列表", videoDevices);
  //   constraints.video.deviceId.exact = videoDevices[0].deviceId;
});

const pc = new RTCPeerConnection();
const remoteVideo = ref(null);
const video = ref(null);

// 创建本地SDP描述,用于描述本地的媒体流
let offerSdp = ref("");
// 创建远端远程SDP描述,用于描述远程的媒体流
let answerSdp = ref("");

// 创建offer
async function createOffer() {
  const offer = await pc.createOffer(); // 创建 offer
  await pc.setLocalDescription(offer); // 设置本地描述
  // 监听 RTCPeerConnection 的 onicecandidate 事件，当 ICE 服务器返回一个新的候选地址时，就会触发该事件
  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      offerSdp.value = JSON.stringify(pc.localDescription);
    }
  };
}

// 创建 answer
const offerSdp2 = ref("");
async function createAnswer() {
  // 解析字符串
  const offer = JSON.parse(offerSdp2.value);
  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      answerSdp.value = JSON.stringify(pc.localDescription);
    }
  };
  // 设置远程的 SDP 描述
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  // 设置本地的 SDP 描述
  await pc.setLocalDescription(answer);
}

// 添加 answer(应答)
const answerSdp2 = ref("");
const addAnswer = async () => {
  const answer = JSON.parse(answerSdp2.value);
  if (!pc.currentRemoteDescription) {
    // 设置远程的 SDP 描述
    pc.setRemoteDescription(answer);
  }
};

const auth = navigator.mediaDevices.getSupportedConstraints(); // 获取浏览器支持的约束属性
let streams = "";
// auth中的属性就是constraints支持的属性
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
function getUserMedia() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      streams = stream;
      setTimeout(() => {
        video.value.muted = false;
      }, 0);
      console.log(streams);
      console.log(streams.getTracks());
      console.log(streams.getAudioTracks());
      console.log(streams.getVideoTracks());
      video.value.srcObject = stream;
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
      // 监听远端视频流
      pc.ontrack = (event) => {
        remoteVideo.value.srcObject = event.streams[0];
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

onMounted(() => {
  getUserMedia();
});
onBeforeUnmount(() => {
  streams.getTracks().forEach((item) => {
    item.stop();
  });
});
</script>
<style lang="scss" scoped>
.camera {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
video {
  width: 400px;
  height: 300px;
}
</style>
