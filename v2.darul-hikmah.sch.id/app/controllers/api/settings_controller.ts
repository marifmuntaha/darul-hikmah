import type { HttpContext } from '@adonisjs/core/http'
import Setting from '#models/setting'
import { cuid } from '@adonisjs/core/helpers'

export default class SettingsController {
  async index({ response }: HttpContext) {
    try {
      const settings = await Setting.query().orderBy('id', 'asc')
      return response.status(200).json({
        result: settings,
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).json({
        message: message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      if (request.file('content')) {
        const image = request.file('content', {
          size: '2mb',
          extnames: ['jpg', 'jpeg', 'png'],
        })
        const key = `images/${cuid()}.${image?.extname}`
        await image?.moveToDisk(key)
        data.content = image?.meta.url
      }
      const setting = await Setting.findOrFail(params.id)
      const update = await setting.merge(data).save()
      return response.status(200).json({
        result: update,
        message: 'Pengaturan berhasil di perbarui.',
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).json({
        message: message,
      })
    }
  }
}
