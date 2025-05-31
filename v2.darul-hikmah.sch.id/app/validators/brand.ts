import vine from '@vinejs/vine'

export const storeBrandValidation = vine.compile(
  vine.object({
    link: vine.string(),
    name: vine.string(),
    description: vine.string().nullable(),
    image: vine.string().nullable(),
  })
)

export const updateBrandValidation = vine.compile(
  vine.object({
    link: vine.string(),
    name: vine.string(),
    description: vine.string().nullable(),
    image: vine.string().nullable(),
  })
)
