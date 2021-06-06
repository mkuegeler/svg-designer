import express from 'express';
import { Request, Response } from 'express';
import config from './config.json';

// import { AbstractPoint, AbstractLine, AbstractRectangle, PointDefault } from './abstract';
// import { MarkupElement } from './markup';
import { createDocument } from './markup-generator';


// import { template_lib } from './templates/lib';

// Default html template
// let id: number = config.default;

// let tpl = template_lib[id].doc;

// const customDoc: markup_document = {
//     name: tpl.document.name,
//     doctype: tpl.document.doctype,
//     attributes: tpl.document.attributes,
//     children: tpl.document.children
// }

const doc = new createDocument().el;

const app = express();

const {
    PORT = config.port,
} = process.env;

app.get('/', (req: Request, res: Response) => {
    res.send(doc);
});

app.get('/:id', (req: Request, res: Response) => {
    res.send(new createDocument(Number(req.params.id)).el);
});

// // create application/json parser
const jsonParser = express.json();

// // create application/x-www-form-urlencoded parser
// const urlencodedParser = express.urlencoded({ extended: false })


// // POST /login gets urlencoded bodies
// app.post('/login', urlencodedParser, function (req, res) {
//     res.send('welcome, ' + req.body.username)
// })

// POST /api/users gets JSON bodies
app.post('/api/:id', jsonParser, function (req, res) {
    // create doc in req.body
    res.send(req.params);
})

app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT);
    // console.log("Tests:\n");
    // console.log(test_tagDefault());
});

// Test functions
// function test_tagDefault(children: child[] = customDoc.children) {
//     let content: string = "";
//     children.forEach(child => {
//         content += new MarkupElement(child.name, {}).el;
//     });
//     return content;
// }