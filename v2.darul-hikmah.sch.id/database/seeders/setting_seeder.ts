import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Setting from '#models/setting'

export default class extends BaseSeeder {
  async run() {
    const setting = [
      { name: 'appname', content: 'PORTAL YAYASAN DARUL HIKMAH MENGANTI' },
      { name: 'favicon', content: '/storage/images/favicon.png' },
      { name: 'phone', content: '082229366506' },
      { name: 'email', content: 'info@darul-hikmah.sch.id' },
      { name: 'whatsapp', content: '082229366506' },
      { name: 'instagram', content: 'yayasandarulhikmahmenganti' },
      { name: 'youtube', content: 'Gallery Darul Hikmah' },
      { name: 'logo', content: 'storage/images/logo.png' },
      { name: 'footerBg', content: 'storage/images/bg-4.png' },
      {
        name: 'footerAbout',
        content:
          'Yayasan Darul Hikmah Menganti secara aktif turut serta dalam menghasilkan generasi yang cerdas, mandiri dan berakhlak mulia.',
      },
    ]

    await Setting.createMany(setting)
  }
}
