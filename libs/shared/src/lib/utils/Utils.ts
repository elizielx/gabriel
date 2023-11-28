export const getApiBaseUrl = (): string => {
    if (typeof window !== "undefined") {
        return "";
    }

    return `http://${process.env.API_HOST ?? "localhost"}:${process.env.API_PORT ?? 3001}`;
};
