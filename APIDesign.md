# Domain

1. User：
    * _id: Object
    * name: String  唯一（可用于登陆吗）
    * password: String  最好哈希
    * phoneNumber: String   需要验证（用于登录）
    * token 用于鉴权
    * sex
    * head_url  头像链接
2.  

# API
1. Session
   * POST: phoneNumber, password<br>Response: 200:{sessionToken}, 403
   * DELETE: sessionToken<br>Response: 200:{}, 403
