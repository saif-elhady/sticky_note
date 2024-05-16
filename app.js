const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/note');
const { result } = require('lodash');
const noteRoutes = require('./routes/noteRoutes')
require('dotenv').config();

//express app
const app = express();

// connect to mongodb
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/notes', noteRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});