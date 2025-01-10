import { addUIData } from "./utils/ui.js";

let like = JSON.parse(localStorage.getItem("like"));
let carts = document.querySelector(".carts2");
let counter_like = document.querySelector(".counter_like");
let counterLikeLength = JSON.parse(localStorage.getItem("like"))?.length || 0;

counter_like.innerHTML = counterLikeLength;
function uiLikeData() {
  carts.innerHTML = "";
  like.forEach((value) => {
    addUIData(value, carts);
  });
}

function delelteLike(id) {
  like = like.filter((value) => value.id !== id);
  localStorage.setItem("like", JSON.stringify(like));
  console.log(like);
}
carts.addEventListener("click", (e) => {
  if (e.target.classList.contains("dislike")) {
    delelteLike(e.target.id);
    uiLikeData();
    counterLikeLength = like.length;
    counter_like.innerHTML = counterLikeLength;
  }
});
uiLikeData();
