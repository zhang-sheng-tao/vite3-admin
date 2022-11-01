export default [
  {
    path: "/about",
    name: "about",
    meta: { title: "测试功能页面", icon: "Aim" },
    redirect: "/about/index",
    children: [
      {
        path: "index",
        name: "index",
        meta: { title: "分级目录", icon: "WalletFilled", btn: true },
        // children: [
        //   {
        //     path: "list",
        //     name: "list",
        //     meta: { title: "分级目录子级", icon: "Wallet" },
        //     // isAuth: true,
        //   },
        //   {
        //     path: "list1212",
        //     name: "list1212",
        //     meta: {},
        //   },
        // ],
      },
      {
        path: "list",
        name: "list",
      },
      {
        path: "dashboards",
        name: "dashboards",
        meta: { title: "分级目录得首页", icon: "WalletFilled" },
      },
    ],
  },
];
