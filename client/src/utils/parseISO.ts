type ParsedDate = {
    day: string;
    time: string;
}

export const parseISO = (date: string): ParsedDate => {
    let [day, time] = date.split('T');
    day = day.split('-').reverse().join('.');
    time = time.substring(0, 5);
    return { day, time }
}