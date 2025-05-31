import type { HttpContext } from '@adonisjs/core/http'
import Slider from '#models/slider'
import { cuid } from '@adonisjs/core/helpers'
import { storeSliderValidation } from '#validators/slider'

export default class SlidersController {
  async index({ response }: HttpContext) {
    try {
      const sliders = await Slider.all()
      return response.status(200).json({
        result: sliders,
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).json({
        message: message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const background = request.file('background', {
        size: '1mb',
        extnames: ['jpg', 'jpeg', 'png'],
      })
      const keyBackground = `images/sliders/${cuid()}.${background?.extname}`
      await background?.moveToDisk(keyBackground)
      data.background = background?.meta.url
      const image = request.file('image', {
        size: '1mb',
        extnames: ['jpg', 'jpeg', 'png'],
      })
      const keyImage = `images/sliders/${cuid()}.${image?.extname}`
      await image?.moveToDisk(keyImage)
      data.image = image?.meta.url
      const payload = await storeSliderValidation.validate(data)
      const slider = await Slider.create(payload)
      return response.status(201).json({
        result: slider,
        message: 'Slider successfully created',
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).json({
        message: message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const slider = await Slider.findOrFail(params.id)
      return response.status(200).json({
        result: slider,
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
      const slider = await Slider.findOrFail(params.id)
      if (request.file('background')) {
        const background = request.file('background', {
          size: '1mb',
          extnames: ['jpg', 'jpeg', 'png'],
        })
        const keyBackground = `images/sliders/${cuid()}.${background?.extname}`
        await background?.moveToDisk(keyBackground)
        data.background = background?.meta.url
      }
      if (request.file('image')) {
        const image = request.file('image', {
          size: '1mb',
          extnames: ['jpg', 'jpeg', 'png'],
        })
        const keyImage = `images/sliders/${cuid()}.${image?.extname}`
        await image?.moveToDisk(keyImage)
        data.image = image?.meta.url
      }
      const payload = await storeSliderValidation.validate(data)
      const update = await slider.merge(payload).save()
      return response.status(200).json({
        result: update,
        message: 'Slider successfully updated',
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).json({
        message: message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const slider = await Slider.findOrFail(params.id)
      const destroy = await slider.delete()
      return response.status(200).json({
        result: destroy,
        message: 'Slider successfully deleted',
      })
    } catch (error) {
      const { status, message } = error
      return response.status(status).json(message)
    }
  }
}
