import { Dayjs } from "dayjs";


export interface EventItem {
    _id: string;
    title: string;
    description: string;
    eventDate: Date;
    organizer: string
}

export interface UserI {
    email: string;
    fullName: string;
    source: string;
    birthDate: Dayjs;
}

export interface UserD {
    email: string;
    fullName: string;
    source: string;
    birthDate: Date;
}

export interface RegisteredI {
    _id: string;
    email: string;
    fullName: string;
    source: string;
    birthDate: Date;
    eventId: string;
}
export interface Field {
    label: string;
    value: string;
}

export interface Chart {
    count: number;
    day: string;
}





