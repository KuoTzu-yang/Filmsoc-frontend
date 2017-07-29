import { File } from '../dvdliba/file';

export class Document {
    doc_url?: File;
    create_log: {
        created_at: string;
    }
    id: number;
    title: string;
}

export class DocumentMeta {
    model: string;
    next: string;
    page: number;
    previous: string;
    total: number;
}

export class DocumentResponse {
    errno: number;
    error: string;
    meta: DocumentMeta;
    objects: Document[];

}

