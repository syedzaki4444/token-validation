const dotenv = require('dotenv')
dotenv.config();

const cors = require('cors');
const express = require('express');

const session = require('express-session');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const v1_userRoutes = require('./routes/v1/user-routes.js');

const { API_PORT, BASE_URL } = process.env;

const options = {
    definition: {
        openapi: "3.0.2",
        info: {
            title: "APIs for python app",
            version: "1.0.0",
            description: "",
            license: 'Proprietary',
            contact: {
                name: 'Zaki & Vivek',
                "email": "zaki.syed@ecozensolutions.com, vivek@ecozensolutions.com",
                url: 'https://www.ecozensolutions.com',
            },
        },
        servers: [
            {
                url: `${BASE_URL}/v1`,
                description: "API Routes",
            },
        ],
        components: {
        },
        security: [
        ],
    },
    apis: ["./routes/v1/user-routes.js",],
};
const specs = swaggerJSDoc(options);

const memoryStore = new session.MemoryStore();

const app = express();
app.use(`${BASE_URL}/v1/api-docs`, swaggerUi.serve, swaggerUi.setup(specs));
app.set('trust proxy', true);  //If the application is running behind a proxy that terminates an SSL connection
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

const adminHandler = async (req, res) => {
    res.send('hello world');
}

app.get('/', adminHandler);
app.use(`${BASE_URL}/v1`, v1_userRoutes);

app.listen(API_PORT, (req, res) => {
    console.log(`API is listening on port ${API_PORT}`);
});

module.exports = app