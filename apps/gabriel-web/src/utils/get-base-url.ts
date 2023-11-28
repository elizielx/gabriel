export const getBaseUrl = (): string => {
    if (typeof window !== "undefined") {
        return "";
    }
    return `http://localhost:${process.env.PORT ?? 5173}`;
};
