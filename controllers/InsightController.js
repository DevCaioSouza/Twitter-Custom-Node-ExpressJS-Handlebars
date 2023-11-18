const Insight = require('../models/insight');
const User = require('../models/User');

module.exports = class InsightController {
  static async showInsights(req, res) {
    res.render('insights/home'); // 'insights' comes from dir views/insights
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Insight, //a req já vai trazer todos insights associados a esse usuário
      plain: true, //para vir só os dados que interessam (p/ fazer o forEach no array)
    });

    if (!user) {
      res.redirect('/login');
    }

    // console.log('User insights : ', user.Insights) //Insights = model no plural

    const insights = user.Insights.map((result) => result.dataValues);

    console.log(insights);

    res.render('insights/dashboard', { insights });
  }

  static async createInsight(req, res) {
    res.render('insights/create');
  }

  static async insightPost(req, res) {
    // const { title } = req.body;

    const insight = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    try {
      await Insight.create(insight);

      req.flash('message', 'Insight created successfully');

      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  }
};
