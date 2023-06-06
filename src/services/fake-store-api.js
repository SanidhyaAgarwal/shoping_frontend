const FakeStoreApi = {
    fetchAllProducts: async () => {
        const res = await fetch('http://localhost:8081/api/product/products');
        const result = res.json();
        console.log(result)
        return result;
    },
    fetchAllCartsByUser: async (userId) => {
        const res = await fetch(`http://localhost:8081/api/carts/active/${userId}`);
        const result = res.json();
        console.log(result)
        return result;
    },
    fetchProductById: async (productId) => {
        const res = await fetch(`http://localhost:8081/api/product/${productId}`)
        const result = await res.json()
        return result
    },
    fetchProductsBySearchQuery: async (query) => {
        const res = await fetch("http://localhost:8081/api/product/products")
        const result = await res.json()
        return result.filter((product) => product.title.toLowerCase().includes(query))
    },
    saveAddress: async (data) => {
        const res = await fetch("http://localhost:8081/api/address/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          console.log(data)
        const result = await res.json()
        return result;
    },
}

export { FakeStoreApi }