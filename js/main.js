import { useFetch } from "./utils/request.js";
import { laodingFunc } from "./utils/loading.js";
import { addUIData } from "./utils/ui.js";
const carts = document.querySelector(".carts");
let counter = document.querySelector(".counter");
let counter_like = document.querySelector(".counter_like");
const request = useFetch();
let cart = JSON.parse(localStorage.getItem("carts")) || [];
const loading = document.querySelector(".loading");
let like = JSON.parse(localStorage.getItem("like")) || [];
let counterLength = JSON.parse(localStorage.getItem("carts"))?.length || 0;
let counterLikeLength = JSON.parse(localStorage.getItem("like"))?.length || 0;

counter.innerHTML = counterLength;
counter_like.innerHTML = counterLikeLength;
const getDataFetch = async () => {
  laodingFunc(true, loading);
  let response = await request({ url: "n17" });
  laodingFunc(false, loading);
  return response;
};
getDataFetch().then((data) => getData(data));
function getData(data) {
  data.forEach((value) => {
    addUIData(value, carts);
  });
  let buttons = document.querySelectorAll(".btn_shop");
  buttons.forEach((value, idx) => {
    value.addEventListener("click", (e) => {
      addToCart(data[idx]);
    });
  });

  attachLikeListeners(data);
}
function addToCart(data) {
  if (cart.find((value) => value.id === data.id)) {
    cart = cart.map((value) => {
      if (value.id === data.id) {
        return {
          ...value,
          count: (value.count += 1),
          userPrice: value.count * value.price,
        };
      }
      return value;
    });
    localStorage.setItem("carts", JSON.stringify(cart));
    return;
  }
  cart = [...cart, { ...data, count: 1, userPrice: data.price }];
  localStorage.setItem("carts", JSON.stringify(cart));
  counterLength = cart.length;
  counter.innerHTML = counterLength;
}
function attachLikeListeners(data) {
  let like_icons = document.querySelectorAll(".like");
  like_icons.forEach((element) => {
    element.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("id"));
      const item = data.find((d) => d.id === String(id));
      if (item) {
        addToLike(item);
      }
    });
  });
}

function addToLike(value) {
  like = [...like, value];
  localStorage.setItem("like", JSON.stringify(like));
  counterLikeLength = like.length;
  counter_like.innerHTML = counterLikeLength;
  window.location.reload();
}
carts.addEventListener("click", (e) => {
  let id = e.target.id;
  if (e.target.classList.contains("dislike")) {
    like = like.filter((value) => value.id !== id);
    localStorage.setItem("like", JSON.stringify(like));
    counterLikeLength = like.length;
    counter_like.innerHTML = counterLikeLength;
    upDatedisLikeIcons();
  }
});

function upDatedisLikeIcons() {
  const likeItems = JSON.parse(localStorage.getItem("like")) || [];
  document.querySelectorAll(".like, .dislike").forEach((icon) => {
    const id = parseInt(icon.getAttribute("id"));
    const isLiked = likeItems.some((item) => item.id === String(id));
    icon.classList.toggle("bxs-heart", isLiked);
    icon.classList.toggle("bx-heart", !isLiked);
    icon.classList.toggle("text-[red]", isLiked);
    icon.classList.toggle("text-white", !isLiked);
    icon.classList.toggle("dislike", isLiked);
  });
}
