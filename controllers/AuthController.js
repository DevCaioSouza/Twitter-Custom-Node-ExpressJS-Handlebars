import User from "../models/User.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import flash from "express-flash";

export default class AuthController {
  static login(req, res) {
    res.render('auth/login');
  }

  static async validateLogin(req, res) {
    //pegando dados enviados pelo corpo da requisição
    const { email, password } = req.body;

    //procurando no banco de dados um elemento com o email enviado na req pelo frontend
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash('message', "There's no user associated with this email");
      res.render('auth/login');

      return;
    }
                                  //password recebido / password do BD
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash('message', 'Invalid password');
      res.render('auth/login');

      return;
    }

    if (passwordMatch) {
      //inicializar sessão de usuário
      try {
        //pegar o id do usuário e atribuí-lo ao userid da session
        //user é o que pegamos na query
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
