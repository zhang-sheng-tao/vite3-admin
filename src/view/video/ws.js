// 多对多视频通话
var express = require("express"); // web框架
const fs = require("fs");

var app = express();
app.use("/js", express.static("example/js"));
app.use("/", express.static("example/many"));

let options = {
  key: fs.readFileSync("./ssl/privatekey.pem"), // 证书文件的存放目录
  cert: fs.readFileSync("./ssl/certificate.pem"),
};

const server = require("https").Server(options, app);
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", function message(data) {
    const str = data.toString();
    const json = JSON.parse(str);
    switch (json.type) {
      case "conn": // 新用户连接
        ws.userName = json.userName;
        ws.send(JSON.stringify(json));
        break;
      case "room": // 用户加入房间
        ws.roomName = json.roomName; //房间号
        ws.streamId = json.streamId; // 房间ID
        const roomUserList = getRoomUser(ws); // 找到当前房间内的所有用户
        if (roomUserList.length) {
          const jsonStr = {
            type: "room",
            roomUserList,
          };
          ws.send(JSON.stringify(jsonStr)); // 返回房间的其他用户信息给当前用户
        }
        break;
      default:
        sendUser(ws, json);
        break;
    }
  });

  ws.on("close", () => {
    const str = JSON.stringify({
      type: "close",
      sourceName: ws.userName,
      streamId: ws.streamId,
    });
    sendMessage(ws, str); // 告诉房间内其他用户有连接关闭
  });
});

// 给所有用户发送数据
function sendMessage(ws, str) {
  wss.clients.forEach((item) => {
    if (item.userName != ws.userName && item.roomName === ws.roomName && item.readyState === 1) {
      item.send(str);
    }
  });
}

// 给用户发送数据
function sendUser(ws, json) {
  if (ws.userName !== json.userName) {
    wss.clients.forEach((item) => {
      if (item.userName === json.userName && item.roomName === ws.roomName && item.readyState === 1) {
        const temp = { ...json };
        delete temp.userName;
        temp.sourceName = ws.userName;
        temp.streamId = ws.streamId;
        item.send(JSON.stringify(temp));
      }
    });
  }
}

// 返回房间内所有用户信息
function getRoomUser(ws) {
  const roomUserList = [];
  wss.clients.forEach((item) => {
    if (item.userName != ws.userName && item.roomName === ws.roomName) {
      roomUserList.push(item.userName);
    }
  });
  return roomUserList;
}

const config = {
  port: 8103,
};
server.listen(config.port); // 启动服务器
console.log("https listening on " + config.port);
