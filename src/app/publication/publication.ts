import { File } from '../dvdliba/file';

export class Publication {
    ext_doc_url?: string;
    cover_url?: File;
    doc_url?: File;
    pub_type: string;
    create_log: {
        created_at: string;
    };
    id: number;
    title: string;
}

export class PublicationMeta {
    model: string;
    next: string;
    page: number;
    previous: string;
    total: number;
}

export class PublicationResponse {
    errno: number;
    error: string;
    meta: PublicationMeta;
    objects: Publication[];

}
