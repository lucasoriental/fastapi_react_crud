import api from "./api";
import { Sale } from "../types/Sale";

export const getSales = async (): Promise<Sale[]> => {
  const response = await api.get<Sale[]>("/sales/");
  return response.data;
};

export const getSalesById = async (id: number): Promise<Sale> => {
  const reponse = await api.get<Sale>(`/sales/${id}`);
  return reponse.data;
};