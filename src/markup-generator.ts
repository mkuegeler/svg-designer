import { MarkupElement } from './markup';
import { template_lib } from './templates/lib';
import config from './config.json';

const tpl = template_lib[config.default].doc;

export interface child {
    name: string,
    attributes?: object,
    children?: child[],
    text?: string | string[]
}

export interface markup_document {
    name: string;
    attributes?: object;
    doctype?: boolean;
    children?: child[];

}

export const defaultDoc: markup_document = {
    name: tpl.document.name,
    attributes: tpl.document.attributes,
    doctype: tpl.document.doctype,
    children: tpl.document.children
}

export class MarkupDocument implements markup_document {
    public name: string;
    public attributes?: object;
    public doctype?: boolean;
    public children?: child[];
    public el: string;
    constructor(name: string = defaultDoc.name,
        attributes?: object, doctype?: boolean,
        children?: child[]) {

        this.name = name;
        attributes ? this.attributes = attributes : {};
        doctype ? this.doctype = true : this.doctype = false;
        children? this.children = children : this.children = [];

        let doc:string = new MarkupElement(name, attributes, this.get_children(this.children),true).el;
        this.doctype === true ? this.el = `<!doctype ${name}>${doc}` : this.el = `${doc}`;

    }
    private get_children(children: child[]) {
        let content: string = "";
        let txt: string = "";
        children.forEach(child => {

            child.children ? content += new MarkupElement(child.name,
                child.attributes ? child.attributes : {}, this.get_children(child.children)).el :
                content += new MarkupElement(child.name, child.attributes,
                    child.text ? txt = Array.isArray(child.text) ? txt = child.text.join(' ') :
                        txt = child.text : txt, true).el;
            if (Boolean(txt) == true) { txt = "" };

        });
        return content;
    }

}

export class viewDocument {
    public id: number;
    public el: string;
    constructor(id: number = 0) {

        this.id = id;
        let tpl: any;
        this.id >= template_lib.length || this.id < 0 ? tpl = template_lib[0].doc : tpl = template_lib[this.id].doc;

        let doctype: boolean = tpl.document.doctype ? tpl.document.doctype : false;

        let params: markup_document = {
            name: tpl.document.name,
            attributes: tpl.document.attributes,
            doctype: doctype,
            children: tpl.document.children
        }

        this.el = new MarkupDocument(params.name,
            params.attributes, params.doctype, params.children).el;
    }
}

export class createDocument {
    public p: markup_document;
    public el: string;
    constructor(p: markup_document = defaultDoc) {
        this.p = p;
        let doctype: boolean = this.p.doctype ? this.p.doctype : false;
        let attributes: object = this.p.attributes ? this.p.attributes : {};

        if (this.p.children) {
            this.el = new MarkupDocument(this.p.name,
                attributes, doctype, this.p.children).el;
        } else {
            this.el = new MarkupDocument(this.p.name,
                attributes, doctype).el;
        }
    }
}

