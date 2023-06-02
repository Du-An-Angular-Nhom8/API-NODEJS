import Joi from 'joi'
export const CategoryJoi = Joi.object({
    name: Joi.string().trim().min(1).max(20).required().messages({
        "string.empty": "Khong duoc de trong name",
        "any.required": "Truong name la truong bat buoc",
    })
})