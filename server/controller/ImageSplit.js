/**
 *  ImageSplit.js
 *  Create By rehellinen
 *  Create On 2018/11/12 11:08
 */
import Multer from 'koa-multer'
import {resolve} from 'path'
import {ProcessImage} from "../utils/ProcessImage"

const data = new Date()
const storage = Multer.diskStorage({
  destination: resolve(__dirname, `../upload/${data.getFullYear()}${data.getMonth() + 1}${data.getDate()}`),
  filename (ctx, file, cb) {
    const filenameArr = file.originalname.split('.');
    cb(null, Date.now() + '.' + filenameArr[filenameArr.length-1]);
  }
});

export const upload = Multer({storage})

export const ImageSplit = () => async (ctx, next) => {
  // 获取图片的RGB数组
  const path = ctx.req.file.path
  const color = await new ProcessImage(path).getRGB()

  // 返回信息
  ctx.body = 'success'
}
