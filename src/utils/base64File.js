// base64转为File对象
export function getFileFromBase64(data) {
  let _fileObj = null;
  const dataArr = data.split(",");
  const byteString = atob(dataArr[1]);
  const options = {
    type: data.split(";base64")[0].slice(5),
    endings: "native",
  };
  const u8Arr = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    u8Arr[i] = byteString.charCodeAt(i);
  }
  _fileObj = new File([u8Arr], fileName, options);

  return _fileObj;
}

// base64 转成blob
export function getBlobFromBase64(data) {
  let _blobObj = null;
  const dataArr = data.split(",");
  const byteString = atob(dataArr[1]);
  var ab = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ab[i] = byteString.charCodeAt(i);
  }
  _blobObj = new Blob([ab], { type: opType });
  return _blobObj;
}

// File对象转为base64
export async function getBase64FromFile(file) {
  return new Promise((reslove) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    // 因为FileReader的操作都是异步的，所以需要在他自身的处理事件上边回调获取
    reader.onload = () => {
      reslove(reader.result);
    };
  });
}

// 压缩图片 file（文件对象）
export async function toBlobFileImage(file, type = " 'image/jpg'", quality = 0.5) {
  const fileName = file.name;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const base64 = await getBase64FromFile(file);
  const img = new Image();
  img.src = base64;
  canvas.width = img.width;
  canvas.height = img.height;
  context.clearRect(0, 0, img.width, img.height);
  context.drawImage(img, 0, 0, img.width, img.height);
  const blob = await canvastoFile(canvas, type, quality);
  const newFile = await new File([blob], fileName, {
    type: type,
  });
  return newFile;
}
