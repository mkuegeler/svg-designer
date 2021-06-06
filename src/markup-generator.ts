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
    doctype: boolean;
    attributes: object;
    children: child[]
}

export const defaultDoc: markup_document = {
    name: tpl.document.name,
    doctype: tpl.document.doctype,
    attributes: tpl.document.attributes,
    children: tpl.document.children
}

export class MarkupDocument implements markup_document {
    public name: string;
    public doctype: boolean;
    public attributes: object;
    public children: child[]
    public el: string;
    constructor(name: string = defaultDoc.name,
        doctype: boolean = defaultDoc.doctype, attributes: object = defaultDoc.attributes,
        children: child[] = defaultDoc.children) {
        this.name = name;
        this.doctype = doctype;
        this.attributes = attributes;
        this.children = children;
        let content: string = this.get_children(this.children);

        let doc = new MarkupElement(name, attributes, content).el;
        doctype === true ? this.el = `<!doctype ${name}>${doc}` : this.el = `${doc}`;

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
        let tpl:any;
        this.id > template_lib.length || this.id < 0 ? tpl = template_lib[0].doc : tpl = template_lib[this.id].doc;   

        let params: markup_document = {
            name: tpl.document.name,
            doctype: tpl.document.doctype,
            attributes: tpl.document.attributes,
            children: tpl.document.children
        }

        this.el = new MarkupDocument(params.name, params.doctype,
            params.attributes, params.children).el;
    }
}

export class createDocument {
    public p: markup_document;
    public el: string;
    constructor(p: markup_document = defaultDoc) {
        this.p = p;
        this.el = new MarkupDocument(this.p.name, this.p.doctype,
            this.p.attributes, this.p.children).el;
    }
}

