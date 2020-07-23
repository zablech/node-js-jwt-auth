const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const NODE_ENV = process.env;
const isProduction = NODE_ENV === 'production';
const prodURL = 'http://localhost:8081';
const localURL = 'http://localhost:8081'
var corsOptions = {
    origin: isProduction? prodURL : localURL,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

const db = require('./app/models/db');
const role = db.role;

// db.sequelize.sync({
//     force: true
// }).then(() => {
//     console.log("Syncing DB");
//     initial();
// });

require('./app/routes/auth.js')(app);
require('./app/routes/user.js')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function initial() {
    
    role.create({
        id: 1,
        name: 'user'
    });

    role.create({
        id: 2,
        name: 'moderator'
    });

    role.create({
        id: 3,
        name: 'admin'
    });
}