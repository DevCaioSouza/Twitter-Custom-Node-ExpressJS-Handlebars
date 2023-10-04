module.exports = class AuthController {
  static login(req, res){
    res.render('auth/login')
  }

  static register(req, res){
    res.render('auth/register') //faz referência a auth/register.handlebars
  }
}