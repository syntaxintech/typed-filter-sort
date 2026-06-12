import { useState } from "react";

interface Product {
  name: string;
  price: number;
  inStock: number;
  category: string;
}

export default function App() {
  const [filterValue, setFilterValue] = useState<string>("");
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

  const filteredProducts = filterProduct(productList, "price", 200);

  console.log(filteredProducts);
  return (
    <div>
      <h1>Filter Mode:</h1>
      <select
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      >
        <option value="">Filter by...</option>
        <option value="200">Filter by price</option>
        <option value="category">Filter by category</option>
        <option value="inStock">Filter by number</option>
      </select>

      <h1>.</h1>
      <ul>
        {productList.map((product) => (
          <li key={product.name}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
