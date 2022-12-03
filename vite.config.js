import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite"; // 全局自动引入api
import Components from "unplugin-vue-components/vite"; // 全局自动注册组件
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; // elementui组件库
import Icons from "unplugin-icons/vite"; // icon
import IconsResolver from "unplugin-icons/resolver"; // 自动引入图标
import VueSetupExtend from "vite-plugin-vue-setup-extend"; // 在script中写name
import { viteMockServe } from "vite-plugin-mock"; // 模拟数据
import { Plugin as importToCDN } from "vite-plugin-cdn-import"; // 打包生效elementui走cdn
import viteCompression from "vite-plugin-compression"; // 打包压缩文件
import path from "path";

const libNameReg = /\/node_modules\/([^/]+)\//;

const manualChunks = (id) => {
  if (libNameReg.test(id.toString())) {
    const libName = RegExp.$1;
    switch (libName) {
      case "@vue":
      case "echarts":
      case "three":
      case "three.js":
      case "@popperjs":
      case "element-plus":
      case "@element-plus":
        return libName;
      default:
        return "vendor";
    }
  }
};

export default defineConfig(({ command, mode }) => {
  return {
    base: "./",
    build: {
      //   minify: "terser",
      reportCompressedSize: false,
      rollupOptions: { manualChunks }, // 打包分包
    },
    plugins: [
      vue(),
      VueSetupExtend(), // <script  name="videos">
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            alias: {
              system: "system-uicons", // 别名
              bi: "bis", // 别名
            },
          }),
        ],
        imports: ["vue", "vue-router"],
        dts: false,
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            // 自动注册https://iconify.design/组件库的名字 注册图标前缀
            enabledCollections: ["ep", "bi", "wi", "ic", "tabler"],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
        compiler: "vue3",
      }),
      viteMockServe({
        localEnabled: command === "serve",
        prodEnabled: command === "build",
        // injectCode: `import { setupProdMockServer } from './mock'
        // setupProdMockServer();`,
      }),
      // importToCDN({
      //   modules: [
      //     {
      //       name: "vue",
      //       var: "Vue",
      //       path: "//unpkg.com/vue@next",
      //     },
      //     {
      //       name: "element-plus",
      //       var: "ElementPlus",
      //       path: "//unpkg.com/element-plus",
      //       css: "//unpkg.com/element-plus/dist/index.css",
      //     },
      //   ],
      // }),
      // 超过500k就压缩
      viteCompression({
        threshold: 512000,
        algorithm: "gzip",
        deleteOriginFile: false,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
    },
  };
});
