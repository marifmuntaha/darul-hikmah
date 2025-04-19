import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  private data = {
    meta: {},
  }

  async home({ view }: HttpContext) {
    this.data.meta = [
      { name: 'title', content: 'Portal Yayasan Darul Hikmah Menganti' },
      { name: 'desc', content: 'Portal Resmi Yayasan Darul Hikmah Menganti Kedung Jepara' },
      {
        name: 'keyword',
        content:
          'portal, portal resmi, portal yayasan, portal yayasan darul hikmah, portal yayasan darul hikmah menganti',
      },
    ]
    return view.render('home', this.data)
  }
}
