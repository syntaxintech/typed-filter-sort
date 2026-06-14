import { useState } from "react";

interface Product {
  name: string;
  price: number;
  inStock: number;
  category: string;
}
type KeyProduct = keyof Product;
export default function AppSort() {
  const [sortValue, setSortValue] = useState<KeyProduct>("name");
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

  function sortItems<T extends object, K extends keyof T>(
    obj: T[],
    key: K,
  ): T[] {
    return [...obj].sort((a, b) => {
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        return a[key].localeCompare(b[key]);
      }
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return a[key] - b[key];
      }
      return 0;
    });
  }

  const sortedProducts = sortItems(productList, sortValue);

  return (
    <div>
      <h1>Sort Product</h1>

      <select
        value={sortValue}
        onChange={(e) => setSortValue(e.target.value as KeyProduct)}
      >
        <option value="">Sort by...</option>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
      <h1>Unsorted list: </h1>
      <ul>
        {productList.map((product) => (
          <li key={product.name}>{product.name}</li>
        ))}
      </ul>
      <h1>Sorted list:</h1>
      <ul>
        {sortedProducts.map((product) => (
          <li key={product.name}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
