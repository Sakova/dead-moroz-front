import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const request = async (config) => {
  const result = await axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

export async function fetchChildGifts(page = 1) {
  const config = {
    method: "get",
    url: `${BASE_URL}/api/v1/gifts/page/${page}`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
  };

  return request(config);
}

export async function fetchCreateGift(details) {
  const data = new FormData();
  if (details.description) data.append("description", details.description);
  if (details.photo) data.append("photo", details.photo);

  var config = {
    method: "post",
    url: `${BASE_URL}/api/v1/gifts`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
    data: data,
  };

  return request(config);
}
