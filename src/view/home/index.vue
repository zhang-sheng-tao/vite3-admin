<template>
  <div class="home">
    <Table :tableHeader="tableHeader" :tableData="tableData" />
  </div>
</template>
<script setup name="home">
import Table from "@/components/Table/index.vue";
import img from "@/assets/menuBg.jpg";

const tableHeader = [
  {
    type: "index",
    width: 70,
    label: "序号",
  },
  {
    label: "姓名",
    prop: (row) => row.name,
  },
  {
    label: "年龄",
    prop: (row) => row.age,
  },
  {
    label: "电话",
    prop: (row) => row.phone,
  },
  {
    label: "地址",
    prop: (row) => row.address,
  },
  { type: "switch", label: "开关", prop: (row) => isSwitch(row) },
  {
    label: "性别",
    prop: (row) => (row.sex ? "女" : "男"),
  },
  {
    type: "img",
    label: "图像",
    prop: (row) => row.img,
  },
  {
    type: "tag",
    label: "操作",
    tag: [
      {
        label: "编辑",
        callback: rowEdit,
      },
      {
        label: "删除",
        callback: rowDelete,
        type: "danger",
      },
    ],
  },
];
const tableData = [
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img,
    switch: false,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 1,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 1,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
  {
    name: "小明",
    sex: 0,
    age: 25,
    phone: 13301020305,
    address: "中粮商务22号",
    img: img,
    switch: true,
  },
];

function rowEdit(file) {
  console.log(file);
}
function rowDelete(file) {
  console.log(file);
}
function isSwitch(row) {
  return new Promise((resolve) => {
    console.log(row);
    return resolve(true);
  });
}
</script>
<style lang="scss" scoped></style>
