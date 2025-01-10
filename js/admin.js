if (!localStorage.getItem("user")) {
  window.location.href = "../src/login.html";
}

import { useFetch } from "./utils/request.js";
import { addUIData } from "./utils/ui.js";
const post_product = document.getElementById("post_product");
let getId = document.getElementById("getId");
let btns = document.querySelectorAll(".btn");
let addForm = document.querySelector(".add");
let deleteForm = document.querySelector(".delete");
let editForm = document.querySelector(".edit");
let carts = document.querySelector(".carts");
let deleteBtn = document.querySelector(".delete-btn");
let id = localStorage.getItem("id") || "add";
let users = JSON.parse(localStorage.getItem("user"));
const request = useFetch();

// header

let name = document.querySelector(".name");
let signOut = document.querySelector(".sign-out");
name.innerHTML = users.username;
signOut.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "../src/index.html";
});

// header

btns.forEach((value) => {
  value.addEventListener("click", (e) => {
    localStorage.setItem("id", e.target.id);
    editUi(e.target.id);
  });
});

function editUi(id) {
  switch (id) {
    case "add":
      addForm.style.display = "block";
      deleteForm.style.display = "none";
      editForm.style.display = "none";
      break;
    case "delete":
      addForm.style.display = "none";
      deleteForm.style.display = "block";
      editForm.style.display = "none";
      break;

    default:
      addForm.style.display = "none";
      deleteForm.style.display = "none";
      editForm.style.display = "block";
      break;
  }
}
post_product.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(post_product.img_file.files[0].type);

  let imgUrl = "";
  if (
    post_product.img_file.files[0].type !== "image/png" &&
    post_product.img_file.files[0].type !== "image/webp"
  ) {
    return alert("Iltimos png krting");
  }
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    imgUrl = event.target.result;

    let newData = {
      img: imgUrl,
      title: post_product.title.value,
      price: +post_product.price.value,
      month: +post_product.month.value,
      rate: +post_product.rate.value,
    };
    postData(newData);
  };
  fileReader.readAsDataURL(post_product.img_file.files[0]);
});

function postData(data) {
  request({ url: "n17", method: "POST", data }).then(() =>
    alert("Mahsulot qoshildi")
  );
}
editUi(id);

// Delete start

deleteBtn.style.display = "none";
getId.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = getId.id.value;
  getOneProduct(id);
  carts.innerHTML = "";
});

function getOneProduct(id) {
  try {
    request({ url: `n17/${id}` }).then((data) => {
      deleteBtn.style.display = "block";
      deleteProductItem(data);
    });
  } catch (error) {}
}

function deleteProductItem(data) {
  addUIData(data, carts);
  deleteBtn.addEventListener("click", () => {
    deleteProduct(data.id);
    data = [];
  });
}
function deleteProduct(id) {
  let sucsses = confirm("Ochirishingizga ishonchingiz komilmi ?");
  if (sucsses) {
    request({ url: `n17/${id}`, method: "DELETE" }).then(() => {
      alert("Malumot ochirildi !");
      carts.innerHTML = "";
      deleteBtn.style.display = "none";
    });
  } else {
    alert("Malumot saqlanib qoldi !");
    carts.innerHTML = "";
    deleteBtn.style.display = "none";
  }
}

// Edit start
let post_product_edit = document.getElementById("post_product_edit");
let carts2 = document.querySelector(".carts2");
let getIdEdit = document.getElementById("getIdEdit");

getIdEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = getIdEdit.id.value;
  getOneProduct2(id);
  carts.innerHTML = "";
});
function getOneProduct2(id) {
  try {
    request({ url: `n17/${id}` }).then((data) => {
      addUIData(data, carts2);
      post_product_edit.style.display = "flex";
      post_product_edit.addEventListener("submit", (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (
          post_product_edit.img_file_edit.files[0].type !== "image/png" &&
          post_product_edit.img_file_edit.files[0].type !== "image/webp"
        ) {
          return alert("Iltimos png krting");
        }
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
          imgUrl = event.target.result;

          let newData = {
            img: imgUrl,
            title: post_product_edit.title_edit.value,
            price: +post_product_edit.price_edit.value,
            month: +post_product_edit.month_edit.value,
            rate: +post_product_edit.rate_edit.value,
          };
          editProduct(data.id, newData);
        };
        fileReader.readAsDataURL(post_product_edit.img_file_edit.files[0]);
      });
    });
  } catch (error) {}
}

function editProduct(id, newData) {
  request({ url: `n17/${id}`, method: "PUT", data: newData }).then(() =>
    alert("Mahsulot ozgartrildi")
  );
}
