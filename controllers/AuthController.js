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

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    //password match validation
    if (password != confirmPassword) {
      req.flash('message', 'Password does not match. Please try again');
      res.render('auth/register');

      return;
    }

    //check if user exists
    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash('message', 'E-mail is already in use.');
      res.render('auth/register');

      return;
    }

    const salt = bcrypt.genSaltSync(10); //defaults to 10 if ommited
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);

      //inicializar sessão de usuário

      req.session.userid = createdUser.id;

      req.flash('message', 'User successfully registered');

      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  }
};
