import { MarkupElement } from './markup';
import tpl from './html-template.json'


export interface child {
    name: string,
    attributes?: object,
    children?: child[],
    text?: string
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
        let content: string = this.get_children(children);

        let doc = new MarkupElement(name, attributes, content).el;
        doctype === true ? this.el = `<!doctype ${name}>${doc}` : this.el = `${doc}`;

    }
    private get_children(children: child[]) {
        let content: string = "";
        let txt: string = "";
        children.forEach(child => {
            child.text ? txt = child.text : txt;
            child.children ? content += new MarkupElement(child.name, child.attributes ? child.attributes: {}, this.get_children(child.children)).el :
                content += new MarkupElement(child.name, child.attributes, txt).el;
        });
        return content;
    }
}

