module.exports = (router) => {
  var bears = require('../controllers/bear.controllers.js');

  router.route('/bears')

  router.route('/bears').post(bears.create);
  router.route('/bears').get(bears.getAll);
  router.route('/bears/:bearId').get(bears.get);
  router.route('/bears/:bearId').put(bears.update);
  router.route('/bears/:bearId').delete(bears.delete);
}
