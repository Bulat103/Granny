const express = require('express');
const app = express();
const PORT = 3000;


app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(logger('dev'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookiePars());


app.get('/', (req, res) => {
   res.render('layout');
 });


 app.listen(PORT, () => {
   console.log('started on port:', PORT);
 });
 