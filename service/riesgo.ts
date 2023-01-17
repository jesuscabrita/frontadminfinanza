import { api } from "./api";

export const useRiesgoPais = async () => {
    try {
        const data = await api.get("/apiriesgopais").then((res) => res.data);
        return data;
    } catch (err) {
        throw new Error(err);
    }
};
