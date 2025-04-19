import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const user = {
      fullName: 'Muhamad Arif Muntaha',
      email: 'marifmuntaha@gmail.com',
      password: 'password',
      role: '1',
      about:
        'Programer adalah seseorang yang menulis dan mengembangkan kode untuk menciptakan perangkat lunak atau aplikasi. Mereka memecahkan masalah dengan logika dan teknologi, serta terus belajar mengikuti perkembangan dunia digital.',
      facebook: 'https://facebook.com/adonis',
      twitter: 'https://twitter.com/adonis',
      instagram: 'https://instagram.com/adonis',
      image: 'https://dummyimage.com/400x400/000/fff',
    }

    await User.create(user)
  }
}
