interface DocumentObject {
    title: string
    content: string
}

export default function createDocumentObject(_title: string, _content: string): DocumentObject {
    return { title: _title, content: _content } as DocumentObject
}

export type {
    DocumentObject,
}