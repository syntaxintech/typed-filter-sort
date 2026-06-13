import { useState } from "react";

interface Product {
  name: string;
  price: number;
  inStock: number;
  category: string;
}

type Dropdown = keyof Product;

export default function App() {
  const [filterValue, setFilterValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState<Dropdown>("name");

  const [productList, setProductList] = useState<Product[]>([
    {
      name: "iphone 12pro",
      price: 200,
      inStock: 3,
      category: "electronics",
    },
    {
      name: "Rounded-neck polo",
      price: 20,
      inStock: 23,
      category: "clothing",
    },
    {
      name: "Google Pixel 10",
      price: 400,
      inStock: 1,
      category: "electronics",
    },
    {
      name: "500g of Rice",
      price: 100,
      inStock: 5,
      category: "food",
    },
  ]);

  function filterProduct<T extends object, K extends keyof T>(
    obj: T[],
    key: K,
    value: T[K],
  ): T[] {
    return obj.filter((product) => product[key] === value);
  }

  let searchValue: string | number = filterValue;
  if (dropdownValue === "price" || dropdownValue === "inStock") {
    searchValue = Number(filterValue);
  }

  const filteredProducts = filterProduct(
    productList,
    dropdownValue,
    searchValue,
  );

  return (
    <div>
      <h1>Filter Mode:</h1>
      <select
        value={dropdownValue}
        onChange={(e) => setDropdownValue(e.target.value as Dropdown)}
      >
        <option value="">Filter by...</option>
        <option value="name">Filter by name</option>
        <option value="price">Filter by price</option>
        <option value="category">Filter by category</option>
        <option value="inStock">Filter by number</option>
      </select>

      <input
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />

      <h1>Filtered Products:</h1>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.name}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
