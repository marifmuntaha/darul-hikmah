import type { HttpContext } from '@adonisjs/core/http'
import Brand from '#models/brand'
import { storeBrandValidation, updateBrandValidation } from '#validators/brand'
import { cuid } from '@adonisjs/core/helpers'

export default class BrandsController {
  async index({ response }: HttpContext) {
    try {
      const brands = await Brand.all()
      return response.status(200).json({
        result: brands,
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      if (request.file('image')) {
        const image = request.file('image', {
          size: '1mb',
          extnames: ['jpg', 'jpeg', 'png'],
        })
        console.log(image)
        const key = `images/brands/${cuid()}.${image?.extname}`
        await image?.moveToDisk(key)
        data.image = image?.meta.url
      } else {
        data.image = null
      }
      const payload = await storeBrandValidation.validate(data)
      const brand = await Brand.create(payload)
      return response.status(201).json({
        result: brand,
        message: 'Brand created!',
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const brand = await Brand.findOrFail(params.id)
      return response.status(200).json({
        result: brand,
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const brand = await Brand.findOrFail(params.id)
      if (request.file('image')) {
        const image = request.file('image', {
          size: '1mb',
          extnames: ['jpg', 'jpeg', 'png'],
        })
        const key = `images/brands/${cuid()}.${image?.extname}`
        await image?.moveToDisk(key)
        data.image = image?.meta.url
      } else {
        data.image = brand.image
      }
      const payload = await updateBrandValidation.validate(data)
      const update = await brand.merge(payload).save()
      return response.status(200).json({
        result: update,
        message: 'Update successfully!',
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const brand = await Brand.findOrFail(params.id)
      const destroy = await brand.delete()
      return response.status(200).json({
        result: destroy,
        message: 'Brand deleted!',
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }
}
