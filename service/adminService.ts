import { api3 } from "./api"

export const adminGet = async () => {
    try {
        const data = await api3.get("/admin").then((res) => res.data);
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

export const adminPost = async(form)=>{
    try{
        const data = await api3.post('/admin', form).then(res => res.data)
        return data;
    }catch(err){
        throw new Error (err);
    }
}