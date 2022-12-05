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
}

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
