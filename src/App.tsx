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

  // This function takes in 3 parameters(the product array, property in the object and the value a key represents)
  function filterProduct<T extends object, K extends keyof T>(
    obj: T[],
    key: K,
    value: T[K],
  ): T[] {
    return obj.filter((product) => product[key] === value);
    // Line 49 is where the filtering happens. We use the filter method to iterate through each product in the array and check if the value of the specified key matches the provided value. If it does, that product is included in the resulting array.
  }

  // line 55 is where we assign the input value we are bringing in and changing it into a number type because value from the input is always a string and we want to compare it with the price and inStock properties which are of type number. We check if the dropdownValue is either "price" or "inStock", if it is, we convert the filterValue to a number using the Number() function. Otherwise, we keep it as a string.
  let searchValue: string | number = filterValue;
  if (dropdownValue === "price" || dropdownValue === "inStock") {
    searchValue = Number(filterValue);
  }

  // we call the filterProduct function and pass in the productList, dropdownValue, and searchValue as arguments. The result is stored in the filteredProducts variable, which will contain the products that match the specified filter criteria. We then render the filtered products in a list below the input fields.
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
        onChange={(e) => setDropdownValue(e.target.value as Dropdown)} // we cast the value of the selected option to the Dropdown type because the value from the
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
