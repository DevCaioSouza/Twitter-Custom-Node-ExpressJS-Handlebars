const Insight = require('../models/insight');
const User = require('../models/User');

module.exports = class InsightController {
  static async showInsights(req, res) {

    const insights = await Insight.findAll({
      include: User
    });

    const allInsights = insights.map(
      (result) => result.get({plain: true})
    )

    console.log('All Insights: ', allInsights);

    res.render('insights/home', { allInsights });
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

    let isEmpty = false;

    if (insights.length === 0) {
      isEmpty = true;
    }

    console.log('Todos insights: ', insights);

    res.render('insights/dashboard', { insights, isEmpty });
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
      if (insight.title !== '') {
        await Insight.create(insight);
      } else {
        req.flash('message', "You can't save an empty insight");
        res.render('insights/create');
        return;
      }

      req.flash('message', 'Insight created successfully');

      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async removeInsight(req, res) {
    const insightId = req.body.id;

    const UserId = req.session.userid;

    try {
      await Insight.destroy({ where: { id: insightId, UserId: UserId } });

      req.flash('message', 'Insight removed successfully');

      req.session.save(() => {
        res.redirect('/insights/dashboard');
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async editInsight(req, res) {
    const id = req.params.id; //params pois o id está vindo pela URL

    const insight = await Insight.findOne({
      where: { id: id },
      raw: true, //Isso formata e "limpa" os dados que são passados, facilita a leitura
    });

    res.render('insights/edit', { insight });

    console.log('insight sendo passado: ', insight);
  }

  static async updateDashboardInsight(req, res) {
    const newText = req.body.title;
    const newId = req.body.id;

    try {
      const insight = await Insight.findOne({
        where: { id: newId },
      });

      insight.title = newText;

      await insight.save();

      req.flash('message', 'Insight updated successfully');

      req.session.save(() => {
        res.redirect('/insights/dashboard');
      });
    } catch (err) {
      console.log(err);
    }
  }
};
