import type { HttpContext } from '@adonisjs/core/http'

export default class NewsController {
  private data = {
    meta: {},
  }

  async index({ view }: HttpContext) {
    return view.render('news', this.data)
  }
}
