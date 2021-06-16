import express from 'express';
import { Request, Response } from 'express';
// import { exit } from 'process';
import config from './config.json';
import { createDocument, viewDocument, markup_document } from './markup-generator';

import { template_lib } from './templates/lib';
import { fragment_lib } from './templates/lib';
import { check_array } from './utils';

const app = express();
// create application/json parser
const jsonParser = express.json();

const {
    PORT = config.port,
} = process.env;

app.get('/', (req: Request, res: Response) => {
    res.send("Start Page");
});

app.get('/item/:pageid', (req: Request, res: Response) => {
    res.send(new viewDocument(Number(req.params.pageid)).el);
});

app.post('/item/:pageid', jsonParser, function (req, res) {

    let result: string = "Invalid data!";
    //let n:number = 0;
    //console.log(`Loop: ${n++}`);

    if (Object.entries(req.body).length != 0 && req.body.constructor === Object) {

        let data: Object = req.body;
        let values: any = [];
        let pageid: number = Number(req.params.pageid);
        // Get page template
        let [tpl]: any = check_array(Number(pageid), template_lib).doc;

        for (const key in data) {
            values = data[key as keyof typeof data];
            if (key === "fragments" && values.constructor === Array) {
                values.forEach((fragmentId: string) => {
                    let fragment = check_array(Number(fragmentId), fragment_lib).doc;
                    fragment.forEach((frg: any) => {
                        let [parent] = tpl.children.filter((parentFilter: { name: string; }) => parentFilter.name === frg.parent);
                        parent.children ? parent.children.push(frg) : parent.children = [frg];
                    });
                });

            }

        }

        let p: markup_document = {
            name: tpl.name,
            attributes: tpl.attributes,
            doctype: tpl.doctype,
            children: tpl.children
        }
        result = new createDocument(p).el;
        // Reset document
        // [tpl] = check_array(Number(pageid), template_lib).doc;

    } else { result = "No body found!" }
    res.send(result);

});

app.post('/demo', jsonParser, function (req, res) {

    let result: string = "Invalid data!";

    if (Object.entries(req.body).length != 0 && req.body.constructor === Object) {
        let data: Object = req.body;
        let values: any = [];

        let pageid: number = 0;
        let [tpl]: any = check_array(Number(pageid), template_lib).doc;

        for (const key in data) {
            values = data[key as keyof typeof data];
            if (key === "fragments" && values.constructor === Array) {
                values.forEach((fragmentId: string) => {
                    let fragment: any = check_array(Number(fragmentId), fragment_lib).doc;
                    let [parent] = tpl.children.filter((parentFilter: { name: string; }) => parentFilter.name === fragment[0].parent);
                    parent.children = [];
                    fragment.forEach((frg: any) => {
                        parent.children.push(frg);
                    });
                });
                let p: markup_document = {
                    name: tpl.name,
                    attributes: tpl.attributes,
                    doctype: tpl.doctype,
                    children: tpl.children
                }
                result = new createDocument(p).el;
            } else { result = "No fragments element in body found!" }
        }


        // let fragment: any = check_array(Number(fragmentId), fragment_lib).doc;
        // let [parent] = tpl.children.filter((parentFilter: { name: string; }) => parentFilter.name === fragment[0].parent);
        // parent.children = [];
        // fragment.forEach((frg: any) => {
        //     parent.children.push(frg);
        // });




    } else { result = "No body found!" }
    res.send(result);

}); // post demo end

app.listen(PORT, () => {
    console.log(`Server started at ${config.host}:${config.port}`);
});


