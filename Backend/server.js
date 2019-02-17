const mongoose = require('mongoose'),
    express = require('express'),
    cors = require('cors'),
    app = express(),
    bodyParser = require('body-parser');

const passport = require('./config/passport')
const authRoutes = require('./routes/authRoutes'),
    productsRoutes = require('./Routes/productsRoutes');

mongoose.connect(`mongodb+srv://${process.env.PV_MONGO_USER}:${process.env.PV_MONGO_PASS}@productsviewer-sjudg.azure.mongodb.net/PV?retryWrites=true`, { useNewUrlParser: true });

app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.headers);
    next();
});

app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cors());
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);

let server = app.listen(80, 'localhost', () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('ProductsViewer Server listening  at http://%s:%s', host, port);
});