export const getApiBaseUrl = (): string => {
    if (typeof window !== "undefined") {
        return "";
    }

    return `http://${process.env.API_HOST ?? "localhost"}:${process.env.API_PORT ?? 3001}`;
};

export const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
