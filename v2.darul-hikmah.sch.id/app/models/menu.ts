import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare parent: number

  @column()
  declare name: string

  @column()
  declare link: string

  @column()
  declare description: string | null

  @column()
  declare child: boolean
}
