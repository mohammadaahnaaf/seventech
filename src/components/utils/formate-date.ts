import { format, formatDistanceToNow } from 'date-fns';


export function fDate(date: any) {
    return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date: any) {
    return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date: any) {
    return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: any) {
    return date ? formatDistanceToNow(new Date(date), {
        addSuffix: true
    }) : null
}

export const fDnT = (timestamp: string) => {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear().toString().slice(-2);
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}`;
};

export const fDnTnow = () => {
    const now = new Date();
    return fDnT(now.toISOString());
};
