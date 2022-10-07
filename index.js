// 기본 설정
const express = require("express");
const fs = require("fs");
const { resolve } = require("path");
const app = express();
const PORT = 3000;

// 정적 파일 불러오기
app.use(express.static(__dirname + "/dmi"));

// 라우팅 정의
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/yummy.html");
});

// plain/text 타입 바디를 받기 위해 미들웨어를 추가하여야 함
app.post("/save", express.text({ type: "*/*" }), (req, res) => {
  // 현재 index.js 파일 위치 기준으로 sensor.txt 파일을 생성함
  fs.writeFileSync(resolve(__dirname, "sensor.txt"), req.body);

  res.status(200).send();
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Listen : ${PORT}`);
});
