import useSWR from "swr";

export interface adminis {
    detalleARS: string;
    monto: number;
    tipo: string;
    pago: string;
    _id: string;
}

export const useAdmin = () => {
    const swr = useSWR<adminis[]>("/admin", {
        refreshInterval: 3000,
    });
    return swr;
};
