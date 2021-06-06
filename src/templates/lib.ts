import html0 from './html/0.json';
import html1 from './html/1.json';
import html2 from './html/2.json';
import html3 from './html/3.json';

// Fragments
import htmlheader from './html/fragments/header.json';

export interface templates {
    name: string,
    type: string,
    doc: any
}

export const template_lib: templates[] = [
    { name: "html0", type: "html", doc: html0 },
    { name: "html1", type: "html", doc: html1 },
    { name: "html2", type: "html", doc: html2 },
    { name: "html3", type: "html", doc: html3 }
]

export const fragment_lib: templates[] = [
    { name: "htmlfragment1", type: "html", doc: htmlheader }
]
