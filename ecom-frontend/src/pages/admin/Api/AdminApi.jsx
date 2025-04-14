const API_URL = "http://localhost:8000/api";

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  return await res.json();
};

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return await res.json();
};

export const saveCategory = async (category) => {
  const method = category.id ? "PUT" : "POST";
  const url = category.id ? `${API_URL}/categories/${category.id}` : `${API_URL}/categories`;
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: category.name }),
  });
  return res.ok;
};

export const deleteCategory = async (id) => {
  const res = await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
  return res.ok;
};

export const saveProduct = async (product) => {
  const method = product.id ? "PUT" : "POST";
  const url = product.id ? `${API_URL}/products/${product.id}` : `${API_URL}/products`;
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.ok;
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
  return res.ok;
};
