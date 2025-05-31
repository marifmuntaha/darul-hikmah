import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Menu from '#models/menu'

export default class extends BaseSeeder {
  async run() {
    const menus = [
      { parent: 0, name: 'BERANDA', link: 'http://localhost:8000', child: false },
      { parent: 0, name: 'PROFIL', link: '#', child: true },
      { parent: 2, name: 'SELAYANG PANDANG', link: '#', child: false },
      { parent: 2, name: 'VISI & MISI', link: '#', child: false },
      { parent: 2, name: 'STRUKTUR ORGANISASI', link: '#', child: false },
      { parent: 0, name: 'LEMBAGA', link: '#', child: true },
      { parent: 6, name: 'RAUDHATUL ATFAL', link: '#', child: false },
      { parent: 6, name: 'MADRASAH IBTIDAIYAH', link: '#', child: false },
      { parent: 6, name: 'MADRASAH TSANAWIYAH', link: '#', child: false },
      { parent: 6, name: 'MADRASAH ALIYAH', link: '#', child: false },
      { parent: 0, name: 'KEGIATAN', link: 'http://localhost:8000/kegiatan', child: false },
      { parent: 0, name: 'BERITA', link: 'http://localhost:8000/berita', child: false },
      { parent: 0, name: 'TENTANG', link: 'http://localhost:8000/berita', child: false },
    ]
    await Menu.createMany(menus)
  }
}
