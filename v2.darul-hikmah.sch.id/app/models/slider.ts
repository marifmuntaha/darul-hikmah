import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import env from '#start/env'

export default class Slider extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({
    serialize: (value: string) => env.get('APP_URL') + value,
  })
  declare background: string | undefined

  @column({
    serialize: (value: string) => env.get('APP_URL') + value,
  })
  declare image: string | undefined

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare button: string | undefined

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
