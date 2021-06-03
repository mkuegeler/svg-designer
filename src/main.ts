import express from 'express';
import { Request, Response } from 'express';

// import { AbstractPoint, AbstractLine, AbstractRectangle, PointDefault } from './abstract';
import { markupElement } from './markup';
import { MarkupDocument, pageDefault, tag } from './markup-generator';

// Get general configuration settings
// import config from './config.json'
// import svg from './svg.json';


// const header = new Header("h4",config.info.Description).el;
// const html = new Html("html", config.html, "Test").el;

const htmlDocument = new MarkupDocument().el;

const app = express();

const {
    PORT = 3000,
} = process.env;

app.get('/', (req: Request, res: Response) => {
    res.send(htmlDocument);
});

// // create application/json parser
// const jsonParser = express.json();

// // create application/x-www-form-urlencoded parser
// const urlencodedParser = express.urlencoded({ extended: false })


// // POST /login gets urlencoded bodies
// app.post('/login', urlencodedParser, function (req, res) {
//     res.send('welcome, ' + req.body.username)
// })

// // POST /api/users gets JSON bodies
// app.post('/api/users', jsonParser, function (req, res) {
//     // create user in req.body
// })

app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT);
    // console.log("Tests:\n");
    // console.log(test_tagDefault());
});

// Test functions
function test_tagDefault(children:tag[]=pageDefault) {
    let content: string = "";
    children.forEach(child => {
        content += new markupElement(child.name, {}).el;
    });
    return content;
}