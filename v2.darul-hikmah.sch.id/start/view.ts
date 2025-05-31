import edge from 'edge.js'
import env from '#start/env'
import { edgeIconify } from 'edge-iconify'
import db from '@adonisjs/lucid/services/db'

/**
 * Register a plugin
 */
edge.use(edgeIconify)

/**
 * Define a global property
 */
async function getSetting() {
  return await db
    .table('settings')
    .then((resp) => {
      const setting = {}
      resp
        .map((item) => {
          const { name, content } = item
          Object.assign(setting, { [name]: content })
        })
        .pop()
      return setting
    })
    .catch(() => {
      return
    })
}

async function getMenu() {
  return await db
    .table('menus')
    .then((resp) => {
      return {
        parent: resp.filter((item) => item.parent === 0),
        children: resp.filter((item) => item.parent !== 0),
      }
    })
    .catch(() => {
      return
    })
}

edge.global('appUrl', env.get('APP_URL'))
edge.global('setting', await getSetting())
edge.global('menu', await getMenu())
