const express = require('express'); // DOC: http://expressjs.com/
const hbs = require('hbs');         // DOC: http://handlebarsjs.com/
const fs = require('fs');           // DOC: https://nodejs.org/api/fs.html

const port = process.env.PORT || 3000;

var _app = express();

hbs.registerPartials(__dirname + '/views/partials');
_app.set('view engine', 'hbs');

_app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append server.log')
    }
  });
  next();
});

_app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: '[!] Maintenance [!]',
  });
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (pText) => {
  return pText.toUpperCase();
});

_app.use(express.static(__dirname + '/public'));

_app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hi, I\'m Peter. Please to meat ya!',
  });
});

_app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

_app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'ERROR: Bad request :('
  });
});

_app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
