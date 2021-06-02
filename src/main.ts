import express from 'express';
import { Request, Response } from 'express';

// import { AbstractPoint, AbstractLine, AbstractRectangle, PointDefault } from './abstract';
import { Html, Header } from './html-templates';

// Get general configuration settings
import config from './config.json'
// import svg from './svg.json';


const header = new Header("h4",config.info.Description).el;
const html = new Html("html", config.html, header).el;

const app = express();

// create application/json parser
const jsonParser = express.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = express.urlencoded({ extended: false })

const {
    PORT = 3000,
} = process.env;

app.get('/', (req: Request, res: Response) => {
    res.send(html);
});

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
    // create user in req.body
})

app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT);
});