//Main file for HTTP calls

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const createSale = async (sale: {
  id: number;
  item: string;
  unit_price: number;
  total: number;
}) => {
  const response = await api.post("/sales", sale);
  return response.data;
};

export default api;
