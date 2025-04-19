/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import db from '@adonisjs/lucid/services/db'

const AuthController = () => import('#controllers/api/auth_controller')
const BrandsController = () => import('#controllers/api/brands_controller')
const GalleriesController = () => import('#controllers/api/galleries_controller')
const HomeController = () => import('#controllers/home_controller')
const MenusController = () => import('#controllers/api/menus_controller')
const NewsController = () => import('#controllers/news_controller')
const PagesController = () => import('#controllers/pages_controller')
const SettingsController = () => import('#controllers/api/settings_controller')
const UsersController = () => import('#controllers/api/users_controller')

router.get('/', [HomeController, 'home'])
router.get('/berita', [NewsController, 'index'])
router.get('/test', async () => {
  return await db
    .table('settings')
    .then((resp) => {
      return resp
    })
    .catch(() => {
      return
    })
})

router
  .group(() => {
    router
      .group(() => {
        router.post('/login', [AuthController, 'login'])
        router.post('/logout', [AuthController, 'logout'])
      })
      .prefix('auth')
    router
      .group(() => {
        router.resource('gallery', GalleriesController).apiOnly()
        router.resource('menu', MenusController).apiOnly()
        router.resource('page', PagesController).only(['index', 'update'])
        router.resource('brand', BrandsController).apiOnly()
        router.resource('user', UsersController).apiOnly()
        router.resource('setting', SettingsController).only(['index', 'update'])
        router.post('/page/upload', [PagesController, 'upload'])
      })
      .use(middleware.auth())
  })
  .prefix('api')
