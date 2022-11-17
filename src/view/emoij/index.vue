<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="微信表情" name="first">
        <img class="emoij" v-for="(wx, i) in weixin" :key="wx" :src="`https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${i}.gif`" :alt="wx" />
      </el-tab-pane>
      <el-tab-pane label="emoij表情" name="second">
        <span class="emoij" v-for="emo in emoij" :key="emo">{{ emo }}</span>
      </el-tab-pane>
      <el-tab-pane label="颜文字" name="third">
        <p class="kaomoji" v-for="kaomo in kaomoji" :key="kaomo">{{ kaomo }}</p>
      </el-tab-pane>
      <el-tab-pane label="iconify图标" name="iconify">
        <p class="kaomoji">
          <el-icon :size="30" color="red">
            <IWiAlien />
          </el-icon>
          <el-icon :size="20" color="green">
            <IBiAirplaneFill />
          </el-icon>
          <el-icon :size="20">
            <IBiAlarmFill />
          </el-icon>
          <el-icon :size="20">
            <IBi0Circle />
          </el-icon>
          <el-icon :size="20" @click="copyText">
            <ITablerAdOff />
          </el-icon>
        </p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup name="emoij">
import Emoij from "@/assets/emoji";

const activeName = ref("iconify");
const weixin = [...Emoij.weixnList];
const emoij = [...Emoij.emojiList];
const kaomoji = [...Emoij.kaomojiList];

function copyText() {
  navigator.clipboard.writeText("花");
}

// 优秀的复制内容到剪切板的库👉 https://clipboardjs.com/
function copyIconTag(str) {
  const content = str;
  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.addEventListener("focusin", (e) => e.stopPropagation());
  textarea.setAttribute("readonly", "");
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand("Copy");
  textarea.remove();
  $message.success({
    message: `已复制到剪切板:${content}`,
    type: "success",
    center: true,
  });
}
</script>
<style lang="scss" scoped>
.emoij {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin: 6px;
  font-size: 28px;
}
.kaomoji {
  margin: 6px;
  display: inline-block;
}
.icon-set {
  padding: 0;

  color: #606060;
  list-style: none;
  background-color: white;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-radius: 4px;
  @media screen and (max-width: 1200px) {
    & > li {
      width: 16.6% !important;
      font-size: 0.9rem;
    }
  }
  @media screen and (max-width: 768px) {
    & > li {
      width: 25% !important;
      font-size: 0.8rem;
    }
  }
  @media screen and (max-width: 480px) {
    & > li {
      width: 33.3% !important;
      font-size: 0.85rem;
    }
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    float: left;
    width: 12.43%;
    height: 120px;
    overflow: hidden;
    text-align: center; /* 用于<i>标签的图标水平居中 */
    overflow-wrap: anywhere;
    cursor: pointer;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    transition: color 0.5s;
    &:hover {
      color: var(--primary-color);
      background-color: #f2f3f4;
    }

    > .svg-icon {
      margin-top: 8px;
      color: #99a9bb;
    }
  }
}
</style>
