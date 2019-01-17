/**
 *  ImageSplit.js
 *  Create By rehellinen
 *  Create On 2018/11/12 11:08
 */
import Multer from 'koa-multer'
import {resolve} from 'path'
import {PreProcess} from "../libs/PreProcess"
import {VGG16} from "../libs/VGG16"

const r = (path) => resolve(__dirname, path)
const data = new Date()
const storage = Multer.diskStorage({
  destination: r(`../../upload/${data.getFullYear()}${data.getMonth() + 1}${data.getDate()}`),
  filename (ctx, file, cb) {
    const filenameArr = file.originalname.split('.');
    cb(null, Date.now() + '.' + filenameArr[filenameArr.length-1]);
  }
});

export const upload = Multer({storage})

export const ImageSplit = () => async (ctx, next) => {
  const path = ctx.req.file.path
  // 预处理
  const info = await new PreProcess(path).get()
  // 使用VGG16进行处理
  // new VGG16(info.pixels).predict()

  // 返回信息
  // delete(info['pixels'])
  ctx.type = 'application/json'
  ctx.body = {
    message: 'success',
    data: info
  }
}

export const testVgg16 = () => async (ctx, next) => {
  const path = r('../upload/20181126/1543229625250.jpg')
  let pre = new PreProcess(path)
  const info = await pre.get()
  const data = new VGG16(info.pixels, pre.width, pre.height).predict()

  ctx.type = 'application/json'
  ctx.body = {
    message: 'success',
    data
  }
}
