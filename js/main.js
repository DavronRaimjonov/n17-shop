import { useFetch, addUIData } from "./utils/index.js";
const carts = document.querySelector(".carts");
let counter = document.querySelector(".counter");
const request = useFetch();
let cart = JSON.parse(localStorage.getItem("carts")) || [];
let counterLength = JSON.parse(localStorage.getItem("carts"))?.length || 0;

counter.innerHTML = counterLength;
request({ url: "n17" }).then((data) => getData(data));
function getData(data) {
  data.forEach((value) => {
    addUIData(value, carts);
  });
  let buttons = document.querySelectorAll(".btn_shop");
  buttons.forEach((value, idx) => {
    value.addEventListener("click", () => {
      addToCart(data[idx]);
    });
  });
}
function addToCart(data) {
  // if()
  if (cart.find((value) => value.id === data.id)) {
    cart = cart.map((value) => {
      if (value.id === data.id) {
        return { ...value, count: (value.count += 1) };
      }
      return value;
    });
    localStorage.setItem("carts", JSON.stringify(cart));
    return;
  }
  cart = [...cart, { ...data, count: 1 }];
  localStorage.setItem("carts", JSON.stringify(cart));
  counterLength = cart.length;
  counter.innerHTML = counterLength;
}

