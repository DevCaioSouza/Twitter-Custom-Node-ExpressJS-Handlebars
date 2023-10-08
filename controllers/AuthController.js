const User = require('../models/User');

const bcrypt = require('bcryptjs');
const flash = require('express-flash');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  }

  static async validateLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash('message', "There's no user associated with this email");
      res.render('auth/login');

      return;
    }
    //                              password enviado / password do BD
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash('message', 'Invalid password');
      res.render('auth/login');

      return;
    }

    if (passwordMatch) {
      try {
        //inicializar sessão de usuário

        req.session.userid = user.id;

        req.flash('message', 'Login successful');

        req.session.save(() => {
          res.redirect('/');
        });
      } catch (err) {
        console.log(err);
      }
    }
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
