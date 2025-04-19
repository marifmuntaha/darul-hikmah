import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import env from "#start/env";

export default class Gallery extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column({
    serialize: (value: string) => {
      const keys: string[] = []
      const images = JSON.parse(value)
      for (let image of images) {
        keys.push(env.get('APP_URL') + image)
      }
      return keys
    },
  })
  declare images: string | undefined

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
