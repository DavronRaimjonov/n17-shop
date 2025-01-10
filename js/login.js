import { useFetch } from "./utils/request.js";
let login_form = document.getElementById("login_form");
const request = useFetch();
login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  request({ url: "telgram" }).then((data) => {
    checkData(
      {
        username: login_form.username.value,
        password: login_form.password.value,
      },
      data
    );
  });
});

function checkData(checkData, data) {
  let findData = data.find(
    (value) =>
      value.username === checkData.username &&
      value.password === checkData.password
  );
  if (!findData) {
    return alert("Username or passoword wrong");
  }
  localStorage.setItem("user", JSON.stringify(findData));
  window.location.href = "../src/admin.html";
}
