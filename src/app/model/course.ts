export interface Course {
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    video: string;
    upcomming: boolean;
}

export class Chapter {
    name: string;
    video: string;
}

export class Audio {
    name: string;
    audio: string;
}

export class PDF {
    name: string;
    pdf: string;
}
