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

export async function fetchUsers(page = 1) {
  const config = {
    method: "get",
    url: `${BASE_URL}/api/v1/users/page/${page}`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
  };

  return request(config);
}

export async function fetchCreateAssessment(details) {
  const data = new FormData();
  if (details.star) data.append("star", details.star);
  if (details.comment) data.append("comment", details.comment);
  if (details.userId) data.append("user_id", details.userId);

  var config = {
    method: "post",
    url: `${BASE_URL}/api/v1/assessments`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
    data: data,
  };

  return request(config);
}

export async function fetchUpdateAssessment(details) {
  var config = {
    method: "patch",
    url: `${BASE_URL}/api/v1/assessments/${details.assessmentId}`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
    data: {
      star: details.star,
      comment: details.comment,
    },
  };

  return request(config);
}

export async function fetchCreateFeedback(details) {
  const data = new FormData();
  if (details.review) data.append("review", details.review);
  if (details.userId) data.append("user_id", details.userId);

  var config = {
    method: "post",
    url: `${BASE_URL}/api/v1/feedbacks`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
    data: data,
  };

  return request(config);
}

export async function fetchUpdateFeedback(details) {
  var config = {
    method: "patch",
    url: `${BASE_URL}/api/v1/feedbacks/${details.feedbackId}`,
    headers: {
      Authorization: localStorage.getItem("auth_token"),
    },
    data: {
      review: details.review,
    },
  };

  return request(config);
}
