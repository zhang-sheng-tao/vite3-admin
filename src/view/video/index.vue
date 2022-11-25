<template>
  <div class="videos">
    <!-- <div>http://live.shiankuaixian.com/live/1400557828_10011_sakx10011_main.flv</div> -->
    <!-- <div>http://120.234.61.31:83/openUrl/a8iFlZe/live.m3u8</div> -->
    <el-button type="primary" size="default" @click="newVideo">播放</el-button>
    <el-button type="primary" size="default" @click="destroy">销毁</el-button>
    <!-- <video ref="flv" class="video"></video> -->
    <div ref="m3u8" id="m3u8"></div>
    <!-- <video id="videojs" style="width: 300px; height: 250px"></video> -->
  </div>
</template>
<script setup name="videos">
import flvjs from "flv.js"; // 不兼容ios系统
import HlsJsPlayer from "xgplayer-hls.js";
import { IsPC } from "@/utils/method";

const flv = ref(null);
const m3u8 = ref(null);
const flvPlayer = ref("");

function play() {
  //   flvPlayer.value.play();
}

function newVideo() {
  let u = {
    id: "m3u8",
    url: "http://120.234.61.31:83/openUrl/usykKSQ/live.m3u8",
    isLive: true,
    // 在安卓端开启hls.js解析功能(有这个选项在ios端会不能播放)
    useHls: navigator.userAgent.indexOf("Android") > -1,
    playsinline: true,
    whitelist: [""],
    autoplay: true,
    // fluid: true,// 宽高100%自适应
    width: 300,
    height: 250,
    // volume: 0, // 静音才能pc端(win)自动播放
    controls: false,
    cssFullscreen: true, //网页样式全屏
    ignores: ["time", "progress", "play"],
    closeVideoClick: true,
    closeVideoTouch: true,
    disableProgress: true,
    enableVideoDbltouch: true,
    closeVideoPreventDefault: true,
    closeVideoStopPropagation: true,
  };
  if (IsPC()) {
    delete u.useHls;
    u.volume = 0;
  }
  let player = new HlsJsPlayer(u);
  m3u8.value = player;
}

function destroy() {
  // 参数 isDelDom: true 删除内部DOM元素 | false 保留内部DOM元素，默认为true
  m3u8.value.destroy(false);
}

onMounted(() => {
  // if (flvjs.isSupported()) {
  //   flvPlayer.value = flvjs.createPlayer({
  //     type: "flv",
  //     isLive: true,
  //     hasAudio: true,
  //     url: "http://live.shiankuaixian.com/live/1400557828_10011_sakx10011_main.flv",
  //   });
  //   flvPlayer.value.attachMediaElement(flv.value);
  //   flvPlayer.value.load();
  //   flvPlayer.value.play();
  // }
  newVideo();
});

onBeforeUnmount(() => {
  m3u8.value.destroy(false);
});
</script>
<style lang="scss" scoped>
.video {
  width: 300px;
  height: 250px;
  object-fit: cover;
}
video {
  object-fit: cover;
}
#m3u8 {
  width: 300px;
  height: 250px;
}
</style>
