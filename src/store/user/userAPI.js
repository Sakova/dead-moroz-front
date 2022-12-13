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

export async function fetchLogOut(state) {
  const config = {
    method: "delete",
    url: `${BASE_URL}/users/sign_out`,
    headers: {
      Authorization: state.auth_token,
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

export async function fetchRandomAvatar() {
  const value = Math.floor(Math.random() * 100);
  const config = {
    method: "get",
    url: `https://avatars.dicebear.com/api/big-smile/${value}.svg?mood[]=happy`,
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
  if (details.street) data.append("street", details.street);
  if (details.house) data.append("house", details.house);
  if (details.floor) data.append("floor", details.floor);
  if (details.items) data.append("items", JSON.stringify(details.items));

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
