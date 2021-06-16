// Templates
import html0 from './html/0.json';
import html1 from './html/1.json';

// Fragments
import header from './html/fragments/header.json';
import script from './html/fragments/script.json';
import meta from './html/fragments/meta.json';
import link from './html/fragments/link.json';

export interface templates {
    name: string,
    type: string,
    doc: any
}

export const template_lib: templates[] = [
    { name: "html0", type: "html", doc: html0 },
    { name: "html1", type: "html", doc: html1 }
]

export const fragment_lib: templates[] = [
    { name: "meta", type: "html", doc: meta },     // 0
    { name: "header", type: "html", doc: header }, // 1
    { name: "script", type: "html", doc: script }, // 2
    { name: "link", type: "html", doc: link }      // 3
]
