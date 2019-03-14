/**
 *  Http.js
 *  Create By rehellinen
 *  Create On 2019/3/14 19:20
 */
import axios from 'axios'

const restUrl = '/api'

export class Http {
  constructor() {
    this.baseUrl = restUrl
  }

  async submitImage (image) {
    let formData = new FormData()
    formData.append('image', image, 'test.jpg')

    return await this.request({
      url: 'image',
      method: 'post',
      reqData: formData,
      contentType: 'application/x-www-form-urlencoded'
    })
  }

  /**
   * 对 axios 请求进行封装
   * @param params 请求参数配置
   *  params参数:
   *  1. url String [api地址]
   *  2. method String [http请求方式]
   *  3. data Object [请求时携带的参数]
   *  4. message Boolean [是否在结果中携带message]
   *  5. contentType String [设置content-type]
   */
  async request ({url, reqData, message, method = 'get', contentType = 'application/json'}) {
    const config = {
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: {
        'content-type': contentType,
      },
      validateStatus: (status) => status < 500
    }
    method === 'get' ? config.params = reqData : config.data = reqData
    const {data, status} = await axios(config)
      .catch(ex => {
        console.log(ex)
      })

    // 成功
    if (status === 200) {
      return message ? data : data.data
    }
  }
}
