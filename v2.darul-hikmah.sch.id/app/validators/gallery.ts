import vine from '@vinejs/vine'

export const storeGalleryValidation = vine.compile(
  vine.object({
    title: vine.string(),
    content: vine.string(),
    images: vine.string(),
  })
)

export const updateGalleryValidation = vine.compile(
  vine.object({
    title: vine.string(),
    content: vine.string(),
    images: vine.string().optional(),
  })
)
