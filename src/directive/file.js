import { typeOf } from "@/utils/method";

// v-file:[order1].xls.multiple="testV" 上传文件
export function file(el, binding) {
  if (typeOf(binding.value) !== "Function") {
    return console.error(new Error("请绑定回调函数"));
  }
  if ((binding.modifiers.img && binding.modifiers.xls) || (!binding.modifiers.img && !binding.modifiers.xls)) {
    return console.error(new Error("只允许上传一种文件格式哦"));
  }
  el.style.cursor = "pointer";
  el.onclick = () => {
    let input = document.createElement("input");
    let flieList = [];
    input.type = "file";
    if (binding.modifiers.xls) {
      input.accept = ".xlsx,.xls,.csv,.xlsm,.xlsb";
    }
    if (binding.modifiers.img) {
      // input.accept = 'image/*'
      input.accept = ".jpg,.png,.gif,.webp,.bmp,.svg";
    }
    if (binding.modifiers.multiple) {
      input.multiple = "multiple";
    }
    input.click();
    input.addEventListener("change", files);
    function files(e) {
      const flies = e.path[0].files;
      Object.keys(flies).forEach((item) => {
        flieList.push(flies[item]);
      });
      binding.value(flieList);
      input.removeEventListener("change", files);
      input = null;
      flieList = null;
    }
  };
}
// 滚动行为
export function isScroll(el, binding) {
  console.log(el, binding);
}
