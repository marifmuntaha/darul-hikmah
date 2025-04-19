import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Page from '#models/page'

export default class extends BaseSeeder {
  async run() {
    const pages = [
      { name: 'home_widget_feature', content: '[]' },
      { name: 'home_widget_about', content: '[]' },
      { name: 'home_widget_course', content: '[]' },
      { name: 'home_widget_admission', content: '[]' },
      { name: 'home_widget_division', content: '[]' },
      { name: 'home_widget_teacher', content: '[]' },
    ]
    await Page.createMany(pages)
  }
}
