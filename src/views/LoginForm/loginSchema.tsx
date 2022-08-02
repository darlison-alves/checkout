import joi from "joi";

export const loginSchema = joi.object({
  email: joi.string().email({ tlds:{ allow: false } }).required(),
  password: joi.string().required()
})

