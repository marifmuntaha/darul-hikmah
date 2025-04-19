import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { storeUserValidation, updateUserValidation } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'

export default class UsersController {
  async index({ response }: HttpContext) {
    try {
      const users = await User.all()
      return response.status(200).json({
        result: users,
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
          extnames: ['jpg, jpeg, png'],
        })
        const key = `images/users/${cuid()}.${image?.extname}`
        await image?.moveToDisk(key)
        data.image = image?.meta.url
      } else {
        data.image = ''
      }
      const payload = await storeUserValidation.validate(data)
      const user = await User.create(payload)
      return response.status(201).json({
        message: 'User created!',
        result: user,
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = User.findOrFail(params.id)
      return response.status(200).json({
        result: user,
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const user = await User.findOrFail(params.id)
      if (request.file('image')) {
        const image = request.file('image', {
          size: '1mb',
          extnames: ['jpg, jpeg, png'],
        })
        const key = `images/users/${cuid()}.${image?.extname}`
        await image?.moveToDisk(key)
        data.image = image?.meta.url
      } else {
        data.image = user.image
      }
      const payload = await request.validateUsing(updateUserValidation, {
        meta: {
          userId: params.id,
        },
        data: data,
      })
      const update = await user.merge(payload).save()
      return response.status(200).json({
        message: 'User updated!',
        result: update,
      })
    } catch (error) {
      console.log(error)
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(200).json({
        message: 'User deleted!',
        result: user,
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }
}
