import vine from '@vinejs/vine'

export const storePageValidation = vine.compile(
  vine.object({
    name: vine.string(),
    content: vine.string().optional(),
  })
)

export const updatePageValidation = vine.compile(
  vine.object({
    name: vine.string(),
    content: vine.string().optional(),
  })
)
