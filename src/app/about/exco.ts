import { File } from '../dvdliba/file';

export class Exco {
    name_en: string;
    name_ch: string;
    position: string;
    descript?: string;
    img_url?: File;
    email: string;
    hall_allocate?: string;
    id: number;
}

export class ExcoMeta {
    model: string;
    next: string;
    page: number;
    previous: string;
    total: number;
}

export class ExcoResponse {
    errno: number;
    error: string;
    meta: ExcoMeta;
    objects: Exco[];
}

