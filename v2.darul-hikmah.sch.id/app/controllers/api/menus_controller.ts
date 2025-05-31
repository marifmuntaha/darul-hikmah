import type { HttpContext } from '@adonisjs/core/http'
import Menu from '#models/menu'
import { storeMenuValidation, updateMenuValidation } from '#validators/menu'

export default class MenusController {
  async index({ response }: HttpContext) {
    try {
      const menus = await Menu.all()
      return response.status(200).json({
        result: menus,
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeMenuValidation.validate(data)
      const user = await Menu.create(payload)
      return response.status(201).json({
        result: user,
        message: 'Menu successfully created',
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const menu = await Menu.findOrFail(params.id)
      return response.status(200).json({
        result: menu,
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const menu = await Menu.findOrFail(params.id)
      const payload = await updateMenuValidation.validate(data)
      const update = await menu.merge(payload).save()
      return response.status(200).json({
        result: update,
        message: 'Menu successfully updated',
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const menu = await Menu.findOrFail(params.id)
      const destroy = await menu.delete()
      return response.status(200).json({
        result: destroy,
        message: 'Menu successfully deleted',
      })
    } catch (error) {
      const { status, messages } = error
      return response.status(status).json(messages)
    }
  }
}
