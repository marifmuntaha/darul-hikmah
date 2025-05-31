import vine from '@vinejs/vine'

export const storeMenuValidation = vine.compile(
  vine.object({
    parent: vine.number(),
    name: vine.string(),
    link: vine.string(),
    description: vine.string().optional(),
    child: vine.boolean(),
  })
)

export const updateMenuValidation = vine.compile(
  vine.object({
    parent: vine.number(),
    name: vine.string(),
    link: vine.string(),
    description: vine.string().optional(),
    child: vine.boolean(),
  })
)
