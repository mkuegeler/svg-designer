import { markupElement } from './markup';
import tpl from './html-template.json'

export interface tag {
    name: string,
    attributes?: object,
    children?: tag[],
    text?: string
}

export const pageDefault: tag[] = [
    { name: "head", attributes: {}, children: [{ name: "meta", attributes: { "charset": "utf-8" } }] },
    { name: "body", attributes: {}, children: [{ name: "h1", attributes: {}, text: "Sample Page" }] }
];

export class MarkupDocument implements tag {
    public name: string;
    public attributes: object;
    public children: tag[];
    public el: string;
    constructor(name: string = tpl.document.name, attributes: object = tpl.document.attributes, children: tag[] = pageDefault) {

        this.name = name;
        this.attributes = attributes;
        this.children = children;
        let content: string = this.get_children(children);
        
        let doc = new markupElement(name, attributes, content).el;
        tpl.document.doctype === true ? this.el = `<!doctype ${name}>${doc}` :  this.el = `${doc}`;
       
    }
    private get_children(children: tag[]) {
        let content: string = "";
        let txt: string = "";
            ; children.forEach(child => {

                child.text ? txt = child.text : txt;
                child.children ? content += new markupElement(child.name, child.attributes, this.get_children(child.children)).el :
                    content += new markupElement(child.name, child.attributes, txt).el;
            });

        return content;

    }
}