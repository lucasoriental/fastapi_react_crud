import { useEffect, useState } from "react";
import { getSales } from "../services/saleService";
import { Sale } from "../types/Sale";

const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [item, setItem] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSales();
      setSales(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <div>
      <p>Products sales:</p>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            <strong>{sale.item}</strong> - R$:{sale.unit_price.toFixed(2)} -
            Unidades Vendidas: {sale.total}
          </li>
        ))}
      </ul>
      <p>Form to Interact to FastAPI</p>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Produt Name{" "}
            <input
              className="flex border-[1px] border-black"
              placeholder="product name"
              type="text"
              onChange={(e) => e.target.value}
              id="product-field"
            />
          </label>
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SalesPage;
