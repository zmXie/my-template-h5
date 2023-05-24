import dayjs from "dayjs";
import basicApi from "@/api/module/basic";
import axios from "axios";

// 多图上传
async function uploadImages(fileList) {
  if (!(fileList instanceof Array)) {
    fileList = [fileList];
  }
  console.log(fileList);
  if (!fileList) {
    console.error("图片数组为空");
    return;
  }
  const { value } = await basicApi
    .getQiniuToken({
      keyPrefix: "",
      returnBody: "",
    })
    .catch(() => {
      fileList.forEach((e) => {
        e.message = "上传失败";
        e.status = "failed";
      });
    });
  fileList.forEach((e) => {
    e.message = "上传中";
    e.status = "uploading";
    uploadQiniu(value, e.file)
      .then((result) => {
        e.message = "";
        e.status = "success";
        e.url = result;
      })
      .catch(() => {
        e.message = "上传失败";
        e.status = "failed";
      });
  });
}

// 上传七牛
let index = 0;
function uploadQiniu(val, file) {
  return new Promise(async (resolve, reject) => {
    try {
      index++;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("token", val.uploadToken);
      formData.append(
        "key",
        `image/scale/${dayjs().format("YYYYMMDDHHmmssSSSS")}${index}.png`
      );
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      //提交给七牛处理
      const response = await axios.post(
        "https://up.qbox.me/",
        formData,
        config
      );
      const result = response.data;
      if (result.hash && result.key) {
        let url = `${val.domain}${result.key}`;
        console.log(url);
        resolve(url);
      } else {
        reject(new Error("上传失败"));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export { uploadQiniu, uploadImages };
