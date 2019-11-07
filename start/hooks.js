const { hooks } = require('@adonisjs/ignitor');
hooks.after.providersBooted(() => {
  const Request = use('Adonis/Src/Request');
  const Exception = use('Exception');
  const Category = use('App/Models/Category');
  const View = use('View');

  View.global('Year', () => {
    return new Date().getFullYear();
  });

  View.global('parseInt', number => {
    return parseInt(number);
  });

  Category.all()
    .then(categories => {
      View.global('categories', categories.toJSON());
    })
    .catch(() => {
      //
    });
  View.global('range', (start, size) => {
    return [...Array(size).keys()].map(i => i + start);
  });
  Request.macro('cart', function() {
    return this.cookie('cart', 0);
  });
});
