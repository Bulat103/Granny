const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  store: new FileStore(),
  secret: 'rtyujn',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  name: 'authorisation',
}));

app.use((req, res, next) => {
  res.locals.username = req.session?.user; // optional chaining operator
  next();
});

app.listen(PORT, () => {
  console.log('Hello');
});
