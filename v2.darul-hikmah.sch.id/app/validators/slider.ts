import vine from '@vinejs/vine'

export const storeSliderValidation = vine.compile(
  vine.object({
    background: vine.string(),
    image: vine.string(),
    title: vine.string(),
    description: vine.string(),
    button: vine.string().optional(),
    status: vine.string(),
  })
)

export const updateSliderValidation = vine.compile(
  vine.object({
    background: vine.string().optional(),
    image: vine.string().optional(),
    title: vine.string(),
    description: vine.string(),
    button: vine.string().optional(),
    status: vine.string(),
  })
)
