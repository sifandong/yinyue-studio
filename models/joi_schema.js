const joi = require('joi')
const joi_schema = joi.object({
    username: joi.string().min(1).max(12).required().error(new Error('用户名格式不符合规范')),
    email: joi.string().email().required().error(new Error('邮箱格式不符合规范')),
    password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).error(new Error('密码格式不符合规范')),
    repeat_password: joi.ref('password')
})
module.exports = joi_schema
