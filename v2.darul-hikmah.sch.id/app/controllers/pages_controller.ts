import type { HttpContext } from '@adonisjs/core/http'
import Page from '#models/page'
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'
import { storePageValidation } from '#validators/page'

export default class PagesController {
  async index({ request, response }: HttpContext) {
    try {
      const pages = Page
      if (request.input('name')) {
        await pages.query().where('name', '=', request.input('name')).first()
      } else {
        await pages.all()
      }
      return response.status(200).json({
        result: pages,
      })
    } catch (error) {
      console.error(error)
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const page = await Page.query().where('name', '=', request.input('name')).first()
      const payload = await storePageValidation.validate(data)
      console.log(payload)
      // const update = await page?.fill(payload).save()
      // return response.status(200).json({
      //   result: update,
      //   message: 'Page updated successfully.',
      // })
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
