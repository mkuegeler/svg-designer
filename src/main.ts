import express from 'express';
import { Request, Response } from 'express';
import config from './config.json';
import { markup_document, viewDocument, createDocument } from './markup-generator';
import { template_lib } from './templates/lib';
import { fragment_lib } from './templates/lib';
import { check_array } from './utils';

const app = express();

const {
    PORT = config.port,
} = process.env;

app.get('/', (req: Request, res: Response) => {
    res.send(new viewDocument().el);
    // res.send('Root!');
});

app.get('/template/:id', (req: Request, res: Response) => {
    res.send(new viewDocument(Number(req.params.id)).el);
});

// app.get('/:id/:title', (req: Request, res: Response) => {
//     let tpl = template_lib[Number(req.params.id)].doc;
//     tpl.document.children[1].children[0].children[0].text = req.params.title;

//     let p: markup_document = {
//         name: tpl.document.name,
//         attributes: tpl.document.attributes,
//         children: tpl.document.children,
//         doctype: tpl.document.doctype
//     }
//     res.send(new createDocument(p).el);

// });

app.get('/fragment/:id', (req: Request, res: Response) => {
    let id:number = 3;
    let tpl = template_lib[id].doc;
    let frg = check_array(Number(req.params.id), fragment_lib).doc.document;
    let children:any = [...template_lib[id].doc.document.children];
    // let body:any = [...template_lib[id].doc.document.children[1].children];
    // body.unshift(frg);
    //children[1].children = [...body];
    // children.unshift(frg);
    children.unshift(frg);


    let p: markup_document = {
        name: tpl.document.name,
        attributes: tpl.document.attributes,
        children: children,
        doctype: tpl.document.doctype
    }

    // children = [];

    res.send(new createDocument(p).el);
    
    

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
// app.post('/api/:id', jsonParser, function (req, res) {
//     // create doc in req.body
//     res.send(req.params);
// })

// let id = 3;
// let tpl:string="";
// let frg = fragment_lib[0].doc.document;
// id > template_lib.length || id < 0 ? tpl = "To large or to small" : tpl = "ok!";

app.listen(PORT, () => {
    console.log(`Server started at ${config.host}:${config.port}`);
    // console.log(frg);
});


