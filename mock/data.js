import menulist from "./menulist";

export default [
  {
    path: "/api/user/logout",
    method: "get",
    response: {
      code: 200,
      data: "退出成功",
    },
  },
  {
    url: "/api/user/login",
    method: "post",
    async rawResponse(req, res) {
      let reqbody = "";
      await new Promise((resolve) => {
        req.on("data", (chunk) => {
          reqbody += chunk;
        });
        req.on("end", () => resolve(undefined));
      });
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 200;
      let d = JSON.parse(reqbody);

      let data = {
        code: 200,
        data: {
          ...d,
          token: btoa(encodeURIComponent(reqbody)),
        },
      };
      if (d.name != "admin") {
        data.data = "账号密码错误";
      }
      res.end(`${JSON.stringify(data)}`);
    },
  },
  {
    url: "/api/user/menulist",
    method: "get",
    response: ({ query }) => {
      return {
        code: 200,
        data: menulist,
      };
    },
  },
  {
    url: "/api/user/info",
    method: "get",
    response: {
      code: 200,
      data: {
        name: "admin",
        sex: 0,
        age: 20,
      },
    },
  },
];