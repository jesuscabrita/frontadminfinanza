import { api4 } from "./api";


export const useNoticias = async () => {
    try {
        const data = await api4.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3181ac09c8eb483abfe1b3b181b39d61").then((res) => res.data);
        return data;
        
    } catch (err) {
        throw new Error(err);
    }
};