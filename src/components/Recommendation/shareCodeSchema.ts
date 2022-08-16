import Joi from "joi";

export const ShareCodeSchema = Joi.object({
  email: Joi.string().email({ tlds:{ allow: false } }).required(),
  code: Joi.string().required(),
  link: Joi.string().required(),
  type: Joi.string().required()
})