import { api3 } from "../service/api";

export interface AdminPostData {
    detalleARS: string;
    monto: number;
    tipo: string;
    pago: string;
}

export const create_Admin = async (data: AdminPostData, token: string) => {
    const res = await api3.post("/admin", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const delete_Admin = async (admin_id, token: string) => {
    const res = await api3.delete(`/admin/${admin_id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const edit_Admin = async (data: AdminPostData, token: string) => {
    const res = await api3.put("/admin", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const deleteAll_Admin = async (token: string)=>{
    const res = await api3.delete(`/admin/delete-all`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}