import express from 'express';
import { Request, Response } from 'express';
import { exit } from 'process';
import config from './config.json';
import { markup_document, viewDocument, createDocument } from './markup-generator';
import { template_lib } from './templates/lib';
import { fragment_lib } from './templates/lib';
import { check_array, add_element } from './utils';

const app = express();

const {
    PORT = config.port,
} = process.env;

app.get('/', (req: Request, res: Response) => {
    res.send(new viewDocument().el);
});

app.get('/template', (req: Request, res: Response) => {
    res.send(new viewDocument().el);
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

app.get('/template/:pageid/:fragmentid', (req: Request, res: Response) => {
    let pageid: number = Number(req.params.pageid);
    let fragmentid: number = Number(req.params.fragmentid);

    // Get page template
    let tpl: any = check_array(Number(pageid), template_lib).doc.document;
    // Get fragment template
    let frg: any = check_array(Number(fragmentid), fragment_lib).doc.document;

    let hde: any = check_array(0, fragment_lib).doc.document;

    tpl.children.forEach((element: any) => {
        if (element.name === frg.attributes.parent) {
            element.children = [...hde.children, ...frg.children];
        }
    });

    // console.log(tpl.children[1]);

    // Get fragment template
    // let frg:any = check_array(Number(pageid), template_lib).doc.document;
    // // Insert position of the fragment in the document
    // let insert:number = Number(tpl.document.insert);

    // let frg = check_array(Number(fragmentid), fragment_lib).doc.document;
    // // const exists:any[] = tpl.document.children[insert].children;
    // // console.log(template_lib[pageid].doc.document.children[insert].children.length);


    // let new_children:any[] = [];
    // tpl.document.children[insert].children.forEach((el: any) => {
    //     new_children.push(el);
    // });

    // new_children=add_element(new_children,frg,true);
    // console.log(new_children.length);
    // // tpl.document.children[insert].children=[];
    // // tpl.document.children[insert].children=new_children;

    // // children[insert].children = Object.assign([],add_element(children[insert].children,frg,true));

    // // console.log(tpl.document.children[insert].children.length);

    let p: markup_document = {
        name: tpl.name,
        attributes: tpl.attributes,
        doctype: tpl.doctype,
        children: tpl.children
    }
    res.send(new createDocument(p).el);
    // let result:string = new createDocument(p).el;
    // console.log(result);

    // res.send("Hello Fragments!");



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
app.post('/api', jsonParser, function (req, res) {

    let data: Object = req.body;
    let values: any = [];
    let result: string = "";


    for (const key in data) {
        values = data[key as keyof typeof data];
        if (key === "fragments" || values.constructor === Array) {

            values.forEach((element: string) => {
                result += `fragmentid = "${element} "`;

            });

        } else { result = "No values found!" }

    }
    res.send(result);
    // res.send(req.body);

})


app.post('/item/:pageid', jsonParser, function (req, res) {

    let result: string = "";


    if (Object.entries(req.body).length != 0 && req.body.constructor === Object) {

        let data: Object = req.body;
        let values: any = [];
        let pageid: number = Number(req.params.pageid);
        // Get page template
        let tpl: any = check_array(Number(pageid), template_lib).doc.document;
        for (const key in data) {
            values = data[key as keyof typeof data];
            if (key === "fragments" && values.constructor === Array) {

                values.forEach((fragmentId: string) => {
                    let fragment = check_array(Number(fragmentId), fragment_lib).doc.document;
                    let [parent] = tpl.children.filter((parentFilter: { name: string; }) => parentFilter.name === fragment.parent);

                    // fragment.name === fragment.parent ? fragment = fragment.children : fragment;
                    parent.children ? parent.children.push(fragment) : parent.children = [fragment];
                });

                let p: markup_document = {
                    name: tpl.name,
                    attributes: tpl.attributes,
                    doctype: tpl.doctype,
                    children: tpl.children
                }

                result = new createDocument(p).el;

            } else { result = "No fragments found!" }

        }

    } else { result = "No body found!" }
    res.send(result);

})

app.listen(PORT, () => {
    console.log(`Server started at ${config.host}:${config.port}`);
});


