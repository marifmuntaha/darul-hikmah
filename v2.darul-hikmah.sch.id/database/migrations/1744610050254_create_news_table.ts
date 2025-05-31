import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'news'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('image').nullable()
      table.string('placeholder').nullable()
      table.integer('user_id')
      table.string('category_id')
      table.string('title')
      table.string('slug')
      table.text('content')
      table.enum('comment', ['1', '2'])
      table.enum('status', ['1', '2'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
