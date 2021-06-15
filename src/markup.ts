// Generic markup language generator
// Core types and functions for generic markup elements and attributes

/* 

// Examples: 

let TestEl0 = new Element();
let TestEl1 = new Element("svg", {});
let TestEl2 = new Element("svg", {}, "children");

let TestEl3 = new Element("svg", { "id": "my svg", "style": "#ffff00" });
let TestEl4 = new Element("svg", { "id": "my svg", "style": "#ffff00" }, "children");

let TestEl5 = new Element("svg", {}, "", true);
let TestEl6 = new Element("svg", { "id": "new svg", "style": "#ffff00" }, "", true);

*/

export interface markup_element {
    name: string,
    attributes: object
}

export class MarkupElement implements markup_element {
    public name: string;
    public attributes: object;
    public el: string;
    public children?: string;
    public closed?: boolean
    constructor(name: string = 'void', attributes: object = {}, children?: string, closed?: boolean) {
        this.name = name;
        this.attributes = attributes;
        children? this.children = children : undefined;
        closed? this.closed = closed : false;

        let attrString: string = '';
        // Check if attributes exist
        if (Object.entries(attributes).length === 0 && attributes.constructor === Object) {
            // Check if children exist

            if (["", undefined].includes(this.children)) {
                this.closed === true ? this.el = `<${name}></${name}>` : this.el = `<${name}/>`;
            }
            else {
                this.el = `<${name}>${this.children}</${name}>`;
            }
        }
        else {
            for (const key in attributes) {
                let value = attributes[key as keyof typeof attributes];
                attrString += ` ${key}="${value}"`;
            }

            if (["", undefined].includes(this.children)) {
                this.closed === true ? this.el = `<${name}${attrString}></${name}>` : this.el = `<${name}${attrString}/>`;
            }
            else {
                this.el = `<${name}${attrString}>${this.children}</${name}>`;
            }
        }
    }
}