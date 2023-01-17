import { api2 } from "./api";

export const useDolar = async () => {
    try {
        const data = await api2.get("/v2/latest").then((res) => res.data);
        return data;
    } catch (err) {
        throw new Error(err);
    }
};
