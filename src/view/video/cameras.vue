<template>
  <div class="cameras">
    <div class="leftVideo">
      <div class="video">
        <video class="isMy" autoplay muted ref="farEnd"></video>
        <div class="roomName">用户的名字</div>
      </div>
      <div class="flex">
        <el-input class="input" v-model="roomName" placeholder="请输入用户名">
          <!-- <template #prepe nd> 用户名 </template> -->
        </el-input>
        <el-input class="input" v-model.number="roomId" placeholder="请输入房间号">
          <template #append>
            <el-button type="primary" @click="addRoom">加入</el-button>
          </template>
        </el-input>
      </div>
      <el-input style="margin-top: 10px" v-model="message" placeholder="请输入内容">
        <template #append>
          <el-button type="primary" @click="messages">发表</el-button>
        </template>
      </el-input>
      <el-button style="margin-top: 10px" @click="handleLeave" type="danger">离开</el-button>
      <el-button style="margin-top: 10px" type="primary">关闭摄像头</el-button>
    </div>
    <el-scrollbar class="list" height="100%">
      <div class="listVideoItem">
        <video class="farEnd" autoplay muted ref="isMy"></video>
        <div class="VideoItemName">我</div>
      </div>
      <!-- <div class="listVideoItem">
        <video class="farEnd" autoplay muted></video>
        <div class="VideoItemName">用户名字</div>
      </div> -->
    </el-scrollbar>
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
const userId = Math.random().toString(36).substring(2); // 用户的ID
const roomId = ref(""); // 房间号
const roomName = ref(""); // 用户姓名
let socket = "";
let streams = ""; // 本地的视频流
let offer = "";

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
      width: 1920, //{ min: 1024, ideal: 1280, max: 1920 },
      height: 1080, //{ min: 720, ideal: 760, max: 1080 },
      frameRate: { ideal: 100, max: 150 }, // 设置帧率
      facingMode: "left", //移动端设置摄像头方向   user前、environment后，left、right）
      // deviceId: { exact: "" },
    },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      setTimeout(() => {
        isMy.value.muted = false;
      }, 0);
      isMy.value.srcObject = stream;
      streams = stream;
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
      // 监听远端视频流
      pc.ontrack = (event) => {
        console.log(event.streams);
        farEnd.value.srcObject = event.streams[0];
      };
    })
    .catch((err) => {
      let message = "找不到摄像头";
      if (err.toString().indexOf("Could not start video source") >= 0) {
        message = "摄像头被占用";
      }
      ElMessage({
        type: "error",
        message,
      });
    });
}

// 加入房间
function addRoom() {
  if (!roomId.value || !roomName.value) {
    return ElMessage({
      type: "warning",
      message: "请填写房间号或者用户名",
    });
  }
  socket = io("https://192.168.168.145:5550");
  // socket链接成功时触发
  socket.on("connect", () => {
    socket.emit("join", { userId, roomId: roomId.value, roomName: roomName.value });
  });
  // 断开连接时触发
  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      // 断线是由服务器发起的，重新连接。
      socket.connect();
    }
    ElMessage.warning("您已断开连接");
  });
  // 服务端发送报错信息
  socket.on("error", (data) => {
    ElMessage.error(data);
  });
  // 当有用户加入房间时触发
  socket.on("welcome", (data) => {
    ElMessage.success(data.userId === userId ? "您已成功加入房间" : `${data.userId}加入房间`);
  });
  // 当有用户离开房间时触发
  socket.on("leave", (data) => {
    ElMessage.warning(data.userId === userId ? "您成功离开房间" : `${data.userId}离开房间`);
  });
  // 当有用户发送消息时触发
  socket.on("message", (data) => {});
  // 创建offer,发送给远端
  socket.on("createOffer", (data) => {
    // 发送 offer
    if (offer) {
      socket.emit("offer", {
        userId,
        roomId: roomId.value,
        sdp: offer,
        roomName: roomName.value,
      });
      return;
    }
    createOffer();
  });
  // 收到offer,创建answer
  socket.on("offer", (data) => {
    if (data.userId == userId) return;
    createAnswer(data.sdp);
  });
  // 收到answer,设置远端sdp
  socket.on("answer", (data) => {
    addAnswer(data.sdp);
  });
}

// 创建 offer
async function createOffer() {
  const offers = await pc.createOffer();
  await pc.setLocalDescription(offers);
  // 当一个新的offer ICE候选人被创建时触发事件
  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      offer = JSON.stringify(pc.localDescription);
      // 发送 offer
      if (offer) {
        socket.emit("offer", {
          userId,
          roomId: roomId.value,
          sdp: offer,
          roomName: roomName.value,
        });
      }
    }
  };
}
// 创建 answer
async function createAnswer(val) {
  const offers = JSON.parse(val);
  pc.onicecandidate = async (event) => {
    // 当一个新的 answer ICE candidate 被创建时
    if (event.candidate) {
      socket.emit("answer", {
        userId: userId,
        roomId: roomId.value,
        sdp: JSON.stringify(pc.localDescription),
        roomName: roomName.value,
      });
    }
  };
  await pc.setRemoteDescription(offers);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
}

// 添加 answer
async function addAnswer(answerSdp) {
  const answers = JSON.parse(answerSdp);
  if (!pc.currentRemoteDescription) {
    pc.setRemoteDescription(answers);
  }
}

// 发送文本消息
const message = ref(""); // 用户发送的信息
function messages() {
  if (!roomId.value || !roomName.value) {
    ElMessage({
      type: "info",
      message: "请填写房间号或者用户名",
    });
    return;
  }
  //   socket.emit("message", {
  //     message,
  //     roomId: roomId.value,
  //     userId,
  //     roomName: roomName.value,
  //   });
}

// 离开房间
function handleLeave() {
  // 关闭对等连接
  pc.close();
  if (socket) {
    // 发送离开的消息
    socket.emit("leave", { userId, roomId: roomId.value });
    // 关闭socket连接
    socket.disconnect();
  }
}

onMounted(() => {
  init();
});
onBeforeUnmount(() => {
  handleLeave();
  if (streams) {
    streams.getTracks().forEach((track) => {
      track.stop();
    });
  }
});
</script>
<style lang="scss" scoped>
.cameras {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .leftVideo {
    width: 70%;
    .video {
      width: 100%;
      height: 80%;
      position: relative;
      .isMy {
        width: 100%;
        height: 100%;
        border: 2px solid #048ff2;
        box-sizing: border-box;
        background: #333;
      }
      .roomName {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 10;
        color: #fff;
      }
    }
    .input {
      width: 45%;
      margin-top: 10px;
    }
  }
  .list {
    width: 28%;
    height: 100%;
    .listVideoItem {
      width: 100%;
      position: relative;
      .farEnd {
        width: 100%;
        height: 300px;
        border: 2px solid #048ff2;
        box-sizing: border-box;
        margin-bottom: 10px;
        background: #333;
      }
      .VideoItemName {
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 10;
        color: #fff;
      }
    }
  }
}
</style>
