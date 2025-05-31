import type { HttpContext } from '@adonisjs/core/http'
import Page from '#models/page'
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'
import { storePageValidation } from '#validators/page'

export default class PagesController {
  async index({ request, response }: HttpContext) {
    try {
      const page = Page.query()
      let pages = null
      if (request.input('name') !== undefined) {
        pages = await page.where('name', request.input('name')).first()
      } else {
        pages = await page.orderBy('id', 'asc')
      }
      return response.status(200).json({
        result: pages,
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const page = await Page.findOrFail(params.id)
      const payload = await storePageValidation.validate(data)
      const update = await page?.merge(payload).save()
      return response.status(200).json({
        result: update,
        message: 'Page updated successfully.',
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async upload({ request, response }: HttpContext) {
    try {
      const image = request.file('image', {
        size: '1mb',
        extnames: ['jpg', 'jpeg', 'png'],
      })
      const key = `images/pages/${cuid()}.${image?.extname}`
      await image?.moveToDisk(key)
      const disk = drive.use('fs')
      const urlImage = await disk.getUrl(String(key))
      return response.status(200).json({
        result: urlImage,
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }
}
