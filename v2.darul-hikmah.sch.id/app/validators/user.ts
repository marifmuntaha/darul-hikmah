import vine from '@vinejs/vine'

export const storeUserValidation = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().confirmed(),
    role: vine.string(),
    about: vine.string(),
    facebook: vine.string().nullable(),
    twitter: vine.string().nullable(),
    instagram: vine.string().nullable(),
    image: vine.string().nullable(),
  })
)

export const updateUserValidation = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.userId)
          .where('email', value)
          .first()
        return !user
      }),
    password: vine.string().confirmed().optional(),
    role: vine.string(),
    about: vine.string(),
    facebook: vine.string().nullable(),
    twitter: vine.string().nullable(),
    instagram: vine.string().nullable(),
    image: vine.string().nullable(),
  })
)
