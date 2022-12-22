<template>
  <div class="moreCaimer">
    <div class="left">
      <video class="left_big" controls></video>
      <el-input class="input" style="margin-top: 10px" v-model="userName" placeholder="请输入用户名" />
      <el-input class="input" style="margin-top: 10px" v-model="roomId" placeholder="请输入房间号">
        <template #append>
          <el-button type="primary" @click="addRoom">加入</el-button>
        </template>
      </el-input>
      <!-- <el-input style="margin-top: 10px" v-model="message" placeholder="请输入内容">
        <template #append>
          <el-button type="primary">发表</el-button>
        </template>
      </el-input> -->
    </div>
    <el-scrollbar class="right" height="100%">
      <video class="right_item" autoplay muted id="myStream"></video>
      <video v-for="(item, index) in videoList" :key="index" :id="item.userId" class="right_item" controls></video>
    </el-scrollbar>
  </div>
</template>
<script setup name="moreCaimer">
import io from "socket.io-client";
let socket = "";
const userId = Math.random().toString(36).substring(2); // 用户的ID
let offer = "";
const pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.voipbuster.com ",
    },
  ],
});

// 开启本地摄像头
function getUserMedia() {
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
      const myStream = document.getElementById("myStream");
      myStream.srcObject = stream;
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
      setTimeout(() => {
        myStream.muted = false;
      }, 0);
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

let i = 0;

const videoList = ref([]); // video元素列表
function createOffer(data) {
  videoList.value.push(data);
  pc.createOffer().then((offers) => {
    pc.setLocalDescription(offers);
    // 当一个新的offer ICE候选人被创建时触发事件
    pc.onicecandidate = async (event) => {
      if (event.candidate) {
        offer = JSON.stringify(pc.localDescription);
        // 发送 offer
        if (offer) {
          socket.emit("offer", {
            userId,
            roomId: roomId.value,
            offer: offer,
            userName: userName.value,
          });
        }
      }
    };
    // 监听远端视频流
    pc.ontrack = (event) => {
      const userVideo = document.getElementById(data.userId);
      userVideo.srcObject = event.streams[0];
      setTimeout(() => {
        userVideo.muted = false;
      }, 10);
    };
  });
}

const userName = ref(""); // 用户名字
const roomId = ref(""); // 房间号
function addRoom() {
  if (!userName.value || !roomId.value) {
    return ElMessage({
      type: "warning",
      message: "请填写房间号或者用户名",
    });
  }
  socket = io("https://192.168.168.145:5551");
  // socket链接成功时触发
  //   socket.on("connect", () => {

  //   });
  socket.emit("addRoom", { userId, roomId: roomId.value, userName: userName.value });
  // 断开连接时触发
  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      // 断线是由服务器发起的，重新连接。
      socket.connect();
    }
    ElMessage.warning("您已断开连接");
  });

  socket.on("error", (data) => {
    ElMessage.error(data);
  });
  socket.on("createOffer", (data) => {
    if (data.userId == userId) return;
    if (offer) {
      socket.emit("offer", {
        userId,
        roomId: roomId.value,
        offer: offer,
        userName: userName.value,
      });
      return;
    }
    createOffer(data);
  });

  // 收到offer,创建answer
  socket.on("offer", (data) => {
    if (data.userId == userId) return;
    createAnswer(data);
  });
  // 收到offer,创建answer
  socket.on("addAnswer", (data) => {
    if (data.userId == userId) return;
    addAnswer(data.offer);
  });
}

// 创建 answer
function createAnswer(data) {
  videoList.value.push(data);
  pc.createAnswer().then((answer) => {
    pc.setRemoteDescription(data.offer);
    pc.setLocalDescription(answer);
    pc.onicecandidate = async (event) => {
      if (event.candidate) {
        socket.emit("addAnswer", {
          userId: userId,
          roomId: roomId.value,
          answer: answer,
          userName: userName.value,
        });
      }
    };
    // 监听远端视频流
    pc.ontrack = (event) => {
      const userVideo = document.getElementById(data.userId);
      userVideo.srcObject = event.streams[0];
      setTimeout(() => {
        userVideo.muted = false;
      }, 10);
    };
  });
}

// 添加 answer
function addAnswer(offers) {
  if (!pc.currentRemoteDescription) {
    pc.setRemoteDescription(offers);
  }
}

onMounted(() => {
  getUserMedia();
});
onBeforeUnmount(() => {
  //   socket.emit("leave", { roomId: roomId.value, userId });
});
</script>
<style lang="scss" scoped>
.moreCaimer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    width: 70%;
    height: 100%;
    .left_big {
      width: 100%;
      height: 80%;
    }
  }
  .right {
    width: 28%;
    .right_item {
      width: 100%;
      height: 300px;
      margin-bottom: 10px;
    }
  }
}
</style>
