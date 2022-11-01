import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite"; // 全局自动引入api
import Components from "unplugin-vue-components/vite"; // 全局自动注册组件
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; // elementui组件库
// import Icons from 'unplugin-icons/vite' // icon
// import IconsResolver from 'unplugin-icons/resolver'// 自动引入图标

import VueSetupExtend from "vite-plugin-vue-setup-extend";

import { viteMockServe } from "vite-plugin-mock";

import path from "path";

const libNameReg = /\/node_modules\/([^/]+)\//;

const manualChunks = (id) => {
  if (libNameReg.test(id.toString())) {
    const libName = RegExp.$1;
    switch (libName) {
      case "@vue":
      case "echarts":
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
  //  if(mode==='build'){}else{}

  return {
    base: "./",
    build: {
      //   minify: "terser",
      reportCompressedSize: false,
      rollupOptions: { manualChunks },
    },
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // IconsResolver({
          //   prefix: 'Icon',
          // })
        ],
        imports: ["vue", "vue-router"],
        dts: false,
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // IconsResolver({
          //   enabledCollections: ['ep'],
          // }),
        ],
      }),
      // Icons({
      //   autoInstall: true,
      // }),
      viteMockServe({
        localEnabled: command === "serve",
        prodEnabled: command === "build",
        // injectCode: `import { setupProdMockServer } from './mock'
        // setupProdMockServer();`,
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
