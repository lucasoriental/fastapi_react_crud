import React, { useState } from "react";

const SalesModal = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [isEdit, setIsEdit] = useState(props.isEdit);
  //const [item, setItem] = useState("");
  //const [unitPrice, setUnitPrice] = useState(0);
  //const [total, setTotal] = useState(0);
  const [errorMessageModal, setErrorMessageModal] = useState("");
  const [errorMessageProductName, setErrorMessageProductName] = useState("");
  const [errorMessageUnitPrice, setErrorMessageUnitPrice] = useState("");
  const [errorMessageTotal, setErrorMessageTotal] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessageModal("");
    if (e.target.name === "input-name") {
      setErrorMessageProductName("");
      if (e.target.value === "") {
        setErrorMessageProductName(
          "This field can't be empty, please enter a value"
        );
      }
    }
    if (e.target.name === "input-price") {
      setErrorMessageUnitPrice("");
      if (e.target.value === "") {
        setErrorMessageUnitPrice(
          "This field can't be empty, please enter a value"
        );
      }
    }
    if (e.target.name === "input-total") {
      setErrorMessageTotal("");
      if (e.target.value === "") {
        setErrorMessageTotal("This field can't be empty, please enter a value");
      }
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const productName = (
      target.elements.namedItem("input-name") as HTMLInputElement
    ).value;
    const unitPrice = (
      target.elements.namedItem("input-price") as HTMLInputElement
    ).value;
    const total = (target.elements.namedItem("input-total") as HTMLInputElement)
      .value;

    if (
      errorMessageProductName !== "" ||
      errorMessageUnitPrice !== "" ||
      errorMessageTotal !== "" ||
      productName === "" ||
      unitPrice === "" ||
      total === ""
    ) {
      setErrorMessageModal("error");
    } else {
      if (!props.isEdit) {
        setErrorMessageModal("");
        console.log("Product Name:", productName);
        console.log("Unit Price:", unitPrice);
        console.log("Total:", total);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>{errorMessageModal}</p>
      <fieldset>
        <label>
          <p>Product Name:</p>
          <input
            name="input-name"
            type="text"
            //value={props.data.item}
            onChange={(e) => onChange(e)}
            defaultValue={isEdit ? props.data.item : ""}
          />
          <p>{errorMessageProductName}</p>
        </label>
        <label>
          <p>Unit Price:</p>
          <input
            name="input-price"
            type="value"
            onChange={(e) => onChange(e)}
            defaultValue={isEdit ? props.data.unit_price : ""}
          />
          <p>{errorMessageUnitPrice}</p>
        </label>
        <label>
          <p>Total Sales:</p>
          <input
            onChange={(e) => onChange(e)}
            name="input-total"
            type="text"
            defaultValue={isEdit ? props.data.total : ""}
          />
          <p>{errorMessageTotal}</p>
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SalesModal;
