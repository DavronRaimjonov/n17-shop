let BASE_URL = "https://67172d90b910c6a6e026d725.mockapi.io/mesage";
const useFetch = () => {
  const response = ({ url, method = "GET", data }) => {
    return fetch(`${BASE_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .catch((error) => console.log(error));
  };
  return response;
};

export { useFetch };
