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

export async function fetchCreateUser(data) {
  const config = {
    method: "post",
    url: `${BASE_URL}/users`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      user: {
        email: data.email,
        password: data.password,
      },
    },
  };

  return request(config);
}

export async function fetchLogIn(data) {
  const config = {
    method: "post",
    url: `${BASE_URL}/users/sign_in`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth_token"),
    },
    data: {
      user: {
        email: data.email,
        password: data.password,
      },
    },
  };

  return request(config);
}

export async function fetchLogOut() {
  const config = {
    method: "delete",
    url: `${BASE_URL}/users/sign_out`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
  };

  return request(config);
}

export async function fetchLogInWithToken(token) {
  const config = {
    method: "get",
    url: `${BASE_URL}/member-data`,
    headers: {
      Authorization: token,
    },
  };

  return request(config);
}

export async function fetchUpdateUser(details) {
  const FormData = require("form-data");
  const data = new FormData();
  if (details.name) data.append("name", details.name);
  if (details.surname) data.append("surname", details.surname);
  if (details.age) data.append("age", details.age);
  if (details.avatar) data.append("avatar", details.avatar);
  if (details.items) data.append("items", JSON.stringify(details.items));
  if (details.email) data.append("email", details.email);
  if (details.password) data.append("password", details.password);

  var config = {
    method: "patch",
    url: `${BASE_URL}/users`,
    headers: {
      Authorization: details.token,
    },
    data: data,
  };

  return request(config);
}

export async function fetchCreateAddress(data) {
  const config = {
    method: "post",
    url: `${BASE_URL}/api/v1/addresses`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth_token"),
    },
    data: {
      street: data.street,
      house: data.house,
      floor: data.floor,
    },
  };

  return request(config);
}
