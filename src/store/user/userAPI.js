import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function fetchCreateUser(data) {
  let config = {
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

  let result = await axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function fetchLogIn(data) {
  let config = {
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

  let result = await axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function fetchLogOut(state) {
  let config = {
    method: "delete",
    url: `${BASE_URL}/users/sign_out`,
    headers: {
      Authorization: state.auth_token,
    },
  };

  let result = await axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

export async function fetchLogInWithToken(token) {
  let config = {
    method: "get",
    url: `${BASE_URL}/member-data`,
    headers: {
      Authorization: token,
    },
  };

  let result = await axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}
