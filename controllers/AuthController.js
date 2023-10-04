const User = require('../models/User');

const bcrypt = require('bcryptjs');
const flash = require('express-flash');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  }

  static register(req, res) {
    res.render('auth/register'); //faz referência a auth/register.handlebars
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    //password match validation
    if (password != confirmPassword) {
      req.flash('message', 'Password does not match. Please try again');
      res.render('auth/register');

      return
    }
  }
};
