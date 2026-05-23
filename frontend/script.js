// Store data
let products = [];
let cart = [];

// 🔥 Fetch products from backend
function fetchProducts() {
  fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(data => {
      products = data;
      displayProducts();
    })
    .catch(err => console.log("Error:", err));
}

// 🔥 Display products as cards
function displayProducts() {
  const productDiv = document.getElementById("products");
  productDiv.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card">
        <h3>${p.name}</h3>
        <p>Price: ₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;

    productDiv.appendChild(div);
  });
}

// 🔥 Add to cart
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  displayCart();
}

// 🔥 Display cart
function displayCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "<h3>Cart Items:</h3>";

  cart.forEach(item => {
    cartDiv.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
  });
}

// 🔥 Checkout
function checkout() {
  alert("Order placed successfully!");
  cart = [];
  displayCart();
}

// 🔥 Add product (Admin)
function addProduct() {
  const name = document.getElementById("pname").value;
  const price = document.getElementById("pprice").value;
  const role = localStorage.getItem("role");

  fetch("http://localhost:3000/add-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, price ,role })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      fetchProducts(); // refresh list
    });
}

// 🔥 Logout
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// 🔥 Login check
function checkLogin() {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  if (!user) {
    window.location.href = "login.html";
  }

  // show admin panel if admin
  if (role === "admin") {
    document.getElementById("adminPanel").style.display = "block";
  }

  // welcome text
  const welcome = document.getElementById("welcome");
  if (welcome) {
    welcome.innerText = `Welcome ${user} (${role})`;
  }
}

// 🔥 Run when page loads
window.onload = function () {
  checkLogin();
  fetchProducts();
};