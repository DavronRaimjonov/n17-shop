let products = document.querySelector(".products");
const products_ui = document.querySelector(".products_ui");
const no_data = document.querySelector(".no-data");
const total_price_element = document.querySelector(".total_price");
const clear = document.querySelector(".clear");
let cart = JSON.parse(localStorage.getItem("carts")) || [];

function renderUiProduct(cart) {
  products.innerHTML = "";
  cart.forEach((value) => {
    let product = document.createElement("div");

    product.innerHTML = `
    <div class="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
            <div class="col-span-12 lg:col-span-2 img box">
              <img
                src=${value.img}
                alt="speaker image"
                class="max-lg:w-full lg:w-[180px] rounded-lg object-cover" />
            </div>
            <div class="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
              <div class="flex items-center justify-between w-full mb-4">
                <h5
                  class="font-manrope font-bold text-2xl leading-9 text-gray-900">
                  ${value.title}
                </h5>
                <button id=${value.id}
                  class="bg-red-500 text-white text-[12px] w-[100px] h-[25px] rounded-full deleteelement group flex items-center justify-center focus-within:outline-red-500">
                 Delete
                </button>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-4">
                  <button id=${value.id}
                    class="group decrement text-2xl w-[30px] h-[30px] rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                  -
                  </button>
                <span>${value.count}</span>
                  <button id=${value.id}
                    class="group increment text-2xl w-[30px] h-[30px]  rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                 +
                  </button>
                </div>
                <h6 
                  class="text-indigo-600  font-manrope font-bold text-xl leading-9 text-right">
                ${value.userPrice.toLocaleString()} so'm
                </h6>
              </div>
            </div>
          </div>...
    `;
    products.append(product);
  });
}

function deleteData(id) {
  cart = cart.filter((value) => value.id !== id);
  localStorage.setItem("carts", JSON.stringify(cart));
  renderUiProduct(cart);
  noData(products_ui, no_data, cart.length);
}
products.addEventListener("click", (e) => {
  const id = e.target.id;
  if (e.target.classList.contains("deleteelement")) {
    deleteData(id);
  }
  if (e.target.classList.contains("increment")) {
    editCount("increment", id);
  }
  if (e.target.classList.contains("decrement")) {
    editCount("decrement", id);
  }

  if (cart.find((value) => value.count <= 0)) {
    deleteData(id);
  }
});
function noData(section, section_404, length) {
  if (length) {
    section_404.style.display = "none";
  } else {
    section.style.display = "none";
    section_404.style.display = "flex";
  }
}
function editCount(classList, id) {
  cart = cart.map((value) => {
    if (value.id === id) {
      if (classList === "decrement") {
        return {
          ...value,
          count: (value.count -= 1),
          userPrice: value.count * value.price,
        };
      }
      if (classList === "increment") {
        return {
          ...value,
          count: (value.count += 1),
          userPrice: value.count * value.price,
        };
      }
    }
    return value;
  });
  localStorage.setItem("carts", JSON.stringify(cart));
  renderUiProduct(cart);
  totlaPrice();
}
function totlaPrice() {
  let total_price_user = cart.reduce(
    (acc, value) => (acc += value.userPrice),
    0
  );

  total_price_element.textContent = total_price_user.toLocaleString() + " so'm";
}
clear.addEventListener("click", () => {
  localStorage.removeItem("carts");
  noData(products_ui, no_data, 0);
});
totlaPrice();
noData(products_ui, no_data, cart.length);
renderUiProduct(cart);
