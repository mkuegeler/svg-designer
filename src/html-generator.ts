import { markupElement } from './markup';

export interface htmldoc {
    head: string,
    body: string
}

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

export class HtmlDocument implements tag {
    public name: string;
    public attributes: object;
    public children: tag[];
    public el: string;
    constructor(name: string = "html", attributes: object = { lang: 'en' }, children: tag[] = pageDefault) {

        this.name = name;
        this.attributes = attributes;
        this.children = children;
        let content: string = this.get_children(children);

        let doctype: string = `<!doctype ${name}>`;
        let html = new markupElement(name, { lang: 'en' }, content).el;
        this.el = `${doctype}${html}`;
    }
    private get_children(children: tag[]) {
        let content: string = "";
        let txt: string = ""
            ; children.forEach(child => {

                child.text ? txt = child.text : txt;
                child.children ? content += new markupElement(child.name, child.attributes, this.get_children(child.children)).el :
                    content += new markupElement(child.name, child.attributes, txt).el;
            });

        return content;

    }
}