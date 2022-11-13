<template>
  <el-table :data="tableData" border>
    <el-table-column align="center" v-for="(item, index) in tableHeader" :key="index" :width="item.width || 'auto'" :label="item.label">
      <template #default="{ row, $index }">
        <template v-if="item.type === 'index'">{{ $index + 1 }}</template>
        <template v-else-if="item.type === 'img'">
          <el-image class="elimage" :hide-on-click-modal="true" fit="cover" :z-index="10" :preview-src-list="[item.prop(row)]" :src="item.prop(row)" />
        </template>
        <template v-else-if="item.type === 'switch'">
          <el-switch v-model="row.switch" :before-change="() => item.prop(row)" active-text="开" inactive-text="关" />
        </template>
        <template v-else-if="item.type === 'tag'">
          <el-tag v-for="(tag, it) in item.tag" :class="{ margin: it % 2 === 1, eltag: true }" :key="it" @click="typeTags(tag.label, tag.callback, row)" :type="tag.type">{{ tag.label }}</el-tag>
        </template>
        <template v-else>
          {{ item.prop(row) }}
        </template>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-model:currentPage="seacrh.currentPage4" v-model:page-size="seacrh.pageSize4" :page-sizes="[10, 20, 30, 40]" :background="true" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>
<script setup>
import { confirm, typeOf } from "@/utils/method.js";
const { tableData, tableHeader } = defineProps({
  tableData: {
    type: Array,
    default: [],
    required: true,
  },
  tableHeader: {
    type: Array,
    default: [],
    required: true,
  },
});
const seacrh = reactive({
  currentPage4: 1,
  pageSize4: 10,
});

function handleSizeChange(limit) {
  console.log(limit);
}
function handleCurrentChange(page) {
  console.log(page);
}

function typeTags(text, callback, row) {
  if (text === "删除") {
    confirm(callback, row);
  } else {
    callback(row);
  }
}
// 开关
function beforeChange(row) {
  return new Promise((resolve) => {
    return resolve(true);
  });
}
</script>
<style lang="scss" scoped>
.margin {
  margin: 0 10px;
}
.eltag {
  cursor: pointer;
  user-select: none;
}
.elimage {
  width: 50px;
  height: 50px;
}
</style>
