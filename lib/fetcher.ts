import { api3 } from "../service/api";

export const backend_fetcher = (token: string) => async (key: string) => {
  const res = await api3.get(key, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
  
};
