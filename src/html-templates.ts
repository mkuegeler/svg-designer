import { Element } from './markup';

export interface html {
    name: string,
    attributes: {},
    children:string
}


export class Html implements html {
    public name:string;
    public attributes: object;
    public children:string;
    public el: string;
    constructor(name:string='html', attributes:object={lang:'en'}, children:string="") {
        this.name =name;
        this.attributes=attributes;
        this.children = children;
        let doctype:string = `<!doctype ${name}>`;
        let ht = new Element(name,attributes,children).el;
        this.el = `${doctype}\n${ht}`;
    }
}


export interface header {
    element: string,
    content: string
}

export class Header implements header {
    public element:string;
    public content:string;
    public el: string;
    constructor(element:string='h1', content:string='Hello World!') {
        this.element = element;
        this.content = content;
        this.el = new Element(element, {}, content).el;

    }

}