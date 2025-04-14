import { useEffect, useState } from "react";
import { getSales } from "../services/saleService";
import { Sale } from "../types/Sale";
import SalesModal from "./salesModal";

const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const getTotalSales = async () => {
      const data = await getSales();
      setSales(data);
    };

    getTotalSales();
  }, []);

  const openModal = (flag = false, row = {}) => {
    if (flag) {
      setEditValues(row);
      setIsEdit(true);
      setModalOpen(true);
    } else {
      //setIsEdit(false)
      setModalOpen(true);
    }
  };

  return (
    <div>
      <p>Products sales:</p>
      <table>
        <tr>
          <th>Product Name</th>
          <th>Unit Price</th>
          <th>Total Sales</th>
        </tr>
        {sales.map((sale) => (
          <tr key={sale.id} className="">
            <td className="border-2 border-gray-500 px-3">{sale.item}</td>
            <td className="border-2 border-gray-500 px-3">{sale.unit_price}</td>
            <td className="border-2 border-gray-500 px-3">{sale.total}</td>
            <td>
              <button
                className="px-4 border-[1px] border-gray-900"
                onClick={() => openModal(true, sale)}
              >
                Edit
              </button>
            </td>
            <td>
              <button className="px-4 border-[1px] border-gray-900">
                delete
              </button>
            </td>
          </tr>
        ))}
      </table>
      <button
        onClick={() => openModal(false)}
        className="px-5 py-3 mt-4 bg-cyan-300"
      >
        Create
      </button>
      {modalOpen && (
        <SalesModal createModal={true} data={editValues} isEdit={isEdit} />
      )}
    </div>
  );
};

export default SalesPage;
