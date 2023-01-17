import useSWR from "swr";

export interface calificacion {
    comentario: string;
    valor: number;
    _id: string;
    createdAt:string;
    name:string;
}

export const useCalificacion = () => {
    const swr = useSWR<calificacion[]>("/calificacion", {
        refreshInterval: 3000,
    });
    return swr;
};