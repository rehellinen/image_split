/**
 *  ImageSplit.js
 *  Create By rehellinen
 *  Create On 2018/11/12 11:08
 */
import Multer from 'koa-multer'
import {resolve} from 'path'
import {PreProcess} from "../libs/PreProcess"
import {VGG16} from "../libs/VGG16"

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
  // const path = require('path').resolve(__dirname, '../upload/20181125/dog.png')
  const path = ctx.req.file.path
  // 预处理
  const info = await new PreProcess(path).get()
  // 使用VGG16进行处理
  new VGG16(info.pixels)

  // 返回信息
  delete(info['pixels'])
  ctx.type = 'application/json'
  ctx.body = {
    message: 'success',
    data: info
  }
}
