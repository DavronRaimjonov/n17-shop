let BASE_URL = "https://67172d90b910c6a6e026d725.mockapi.io/mesage";
const useFetch = () => {
  const response = ({ url, method = "GET", data }) => {
    return fetch(`${BASE_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((data) => data.json())
      .catch((error) => console.log(error));
  };
  return response;
};
function addUIData(value, carts) {
  let card = document.createElement("div");

  card.innerHTML = `
      <div>
            <img
              class="w-full"
              src=${value.img}
              alt=""
            />
          </div>
          <div>
            <h2 class="text-[14px]">${value.title.slice(0, 60) + "..."}</h2>
            <p><i class="bx bxs-star text-[gold]"></i>${value.rate}</p>
            <h3>${value.month
              .toLocaleString("uz-UZ")
              .replace(/,/g, " ")} so'm/oyiga</h3>
            <div class="flex items-center justify-between">
              <h2>${value.price
                .toLocaleString("uz-UZ")
                .replace(/,/g, " ")} so'm</h2>
             <button class="btn_shop"><i class="bx bx-shopping-bag text-2xl"></i></button>
            </div>
          </div>
      `;
  carts.append(card);
}

export { useFetch, addUIData };
