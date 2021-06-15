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

        // console.log(tpl);

        for (const key in data) {
            values = data[key as keyof typeof data];
            if (key === "fragments" && values.constructor === Array) {

                let children: any = [];
                let frg: any ={};
                let parent:any = {};
                

                values.forEach((element: string) => {
                    // let fragmentid: number = Number(element);
                    frg = check_array(Number(element), fragment_lib).doc.document;
                    parent = tpl.children.filter((p: { name: string; }) => p.name === frg.parent);
                    // parent.children = [...frg];
                    // frg.name === frg.parent ? children.push(...frg.children) : children.push(frg);
                    // parent.children.push(frg);
                    // if (parent.children) { console.log(parent.children); children.push(parent.children); }
                    parent.push(frg);
                    console.log(parent);

                });

                // console.log(children);


                // console.log(children);
                // let n:number = 0; 
                // children.forEach((child: any) => {
                //   console.log(child);
                    
                //     // console.log(`Fragment children: ${child.children[0].name} - Parent of Fragment: ${child.parent}`);
                //     let c:any= child.children; let p:string = child.parent;
                //     // tpl.children.filter((x: { name: string; }) => x.name === p).children = [...c];

                //     let parent = tpl.children.filter((x: { name: string; }) => x.name === p);
                //     parent.children = [...c];
                //     console.log(parent);
                    
                    
                //     // console.log(parent.children);
                //     // tpl.children.forEach((element: any) => {
                //     //     // console.log(`Parent: ${element.name} - Fragment: ${child.name} - Parent of Fragment: ${child.parent}`);
                //     //     // element.children = element.name === child.parent ? child.children.children : child.children;
                //     //     if (element.name === p) {
                //     //         // console.log(`Element: ${element.name} - Child: ${child}`);
                //     //         element.children = [...c];
                //     //     }
                //     // });
                //     // console.log(`------------ Element: ${n} -----------`);
                //     //        console.log(tpl.children);
                //     // n++; 
                // });

                // console.log(tpl.children);

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


