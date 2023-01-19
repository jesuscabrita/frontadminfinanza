import { api3 } from "../service/api";

export interface AdminPoscalificacion {
    comentario: string;
    valor: number;
    imagen: string;
    name: string;
}

export const create_Calificacion = async (data: AdminPoscalificacion, token: string) => {
    const res = await api3.post("/calificacion", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const delete_Calificacion = async (admin_id, token: string) => {
    const res = await api3.delete(`/calificacion/${admin_id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const edit_Calificacion = async (data: AdminPoscalificacion, token: string) => {
    const res = await api3.put("/calificacion", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};