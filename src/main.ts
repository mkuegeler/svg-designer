import express from 'express';
import { Request, Response } from 'express';
import config from './config.json';
import { markup_document, viewDocument, createDocument } from './markup-generator';
import { template_lib } from './templates/lib';

const app = express();

const {
    PORT = config.port,
} = process.env;

app.get('/', (req: Request, res: Response) => {
    res.send(new viewDocument().el);
});

app.get('/:id', (req: Request, res: Response) => {
    res.send(new viewDocument(Number(req.params.id)).el);
});

app.get('/:id/:title', (req: Request, res: Response) => {
    let tpl = template_lib[Number(req.params.id)].doc;
    tpl.document.children[1].children[0].children[0].text = req.params.title;

    let p: markup_document = {
        name: tpl.document.name,
        doctype: tpl.document.doctype,
        attributes: tpl.document.attributes,
        children: tpl.document.children
    }
    res.send(new createDocument(p).el);

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
    console.log(`Server started at ${config.host}:${config.port}`);
});


