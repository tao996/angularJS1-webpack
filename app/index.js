require('./css/main.css');
require('./css/main.scss');

var sub = require('./js/sub');

var app = document.createElement('div');
app.innerHTML = '<h1>Hello World</h1>';
app.appendChild(sub());

document.body.appendChild(app);

$('body').append('<p>Hello Webpack </p>')