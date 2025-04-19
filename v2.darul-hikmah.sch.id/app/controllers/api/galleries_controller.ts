import type { HttpContext } from '@adonisjs/core/http'
import Gallery from '#models/gallery'
import { cuid } from '@adonisjs/core/helpers'
import { storeGalleryValidation, updateGalleryValidation } from '#validators/gallery'

export default class GalleriesController {
  async index({ response }: HttpContext) {
    try {
      const galleries = await Gallery.all()
      return response.status(200).send({
        result: galleries,
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).send(message)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const keys: string[] = []
      const images = request.files('images', {
        size: '1mb',
        extnames: ['jpg', 'jpeg', 'png'],
      })
      for (let image of images) {
        const key = `/images/galleries/${data.title}/${cuid()}.${image.extname}`
        await image.moveToDisk(key)
        keys.push(image.meta.url)
      }
      data.images = JSON.stringify(keys)
      const payload = await storeGalleryValidation.validate(data)
      const gallery = await Gallery.create(payload)
      return response.status(201).json({
        result: gallery,
        message: 'Gallery successfully created',
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).send(message)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const galery = await Gallery.findOrFail(params.id)
      return response.status(200).json({
        result: galery,
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).send(message)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const gallery = await Gallery.findOrFail(params.id)
      let keys: string[] = []
      if (request.file('images')) {
        const images = request.files('images', {
          size: '1mb',
          extnames: ['jpg', 'jpeg', 'png'],
        })
        for (let image of images) {
          const key = `/images/galleries/${data.title}/${cuid()}.${image.extname}`
          await image.moveToDisk(key)
          keys.push(image.meta.url)
        }
      } else {
        keys = JSON.parse(String(gallery.images))
      }
      data.images = JSON.stringify(keys)
      const payload = await updateGalleryValidation.validate(data)
      const update = await gallery.merge(payload).save()
      return response.status(201).json({
        result: update,
        message: 'Gallery successfully updated',
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).send(message)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const gallery = await Gallery.findOrFail(params.id)
      const destroy = await gallery.delete()
      return response.status(200).json({
        result: destroy,
        message: 'Gallery successfully deleted',
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).send(message)
    }
  }
}
