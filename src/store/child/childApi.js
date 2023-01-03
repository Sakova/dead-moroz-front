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
  if (details.userId) data.append("user_id", details.userId);

  const config = {
    method: "post",
    url: `${BASE_URL}/api/v1/gifts`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
    data: data,
  };

  return request(config);
}

export async function fetchUpdateGift(details) {
  const data = new FormData();
  if (details.description) data.append("description", details.description);
  if (details.photo) data.append("photo", details.photo);

  const config = {
    method: "patch",
    url: `${BASE_URL}/api/v1/gifts/${details.giftId}`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
    data: data,
  };

  return request(config);
}

export async function fetchDeleteGift(giftId) {
  const config = {
    method: "delete",
    url: `${BASE_URL}/api/v1/gifts/${giftId}`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
  };

  return { result: request(config).result, giftId };
}
