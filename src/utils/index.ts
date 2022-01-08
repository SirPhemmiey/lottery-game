

export const addMinutes = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes*60000);
}

export const generateRandomString = () => {
    return Math.random().toString(20);
}
