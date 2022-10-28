const files = import.meta.globEager("@/api/*.js");

const modules = {};

for (const key in files) {
  modules[key.replace(/^\.\/modules\/(.*)\.\w+$/, "$1")] = files[key].default;
}

Object.keys(modules).forEach((item) => {
  // 为每个模块添加一个前缀名，保证模块命明不冲突
  modules[item]["namespaced"] = true;
});

console.log(modules);
