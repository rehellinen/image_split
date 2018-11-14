/**
 *  ImageSplit.js
 *  Create By rehellinen
 *  Create On 2018/11/12 11:08
 */
import Multer from 'koa-multer'
import {resolve} from 'path'

const data = new Date()
const storage = Multer.diskStorage({
  destination: resolve(__dirname, `../upload/${data.getFullYear()}${data.getMonth() + 1}${data.getDate()}`),
  filename (ctx, file, cb) {
    const filenameArr = file.originalname.split('.');
    cb(null, Date.now() + '.' + filenameArr[filenameArr.length-1]);
  }
});

export const ImageSplit = () => async (ctx, next) => {
  console.log(ctx.req.file)
  ctx.body = 'success'
}

export const upload = Multer({storage})
