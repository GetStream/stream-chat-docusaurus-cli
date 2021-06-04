import { WEBSITE_BASE_URL } from './environment';

function getCSRFToken() {
  const matches = document.cookie.match(new RegExp('csrftoken=([^;]+)', 'i'));
  return matches ? matches[1] : '';
}

const fetchApi = async (method, path, body) => {
  const response = await fetch(`${WEBSITE_BASE_URL}/${path}/`, {
    method,
    body,
    credentials: 'include',
    headers: { 'x-csrftoken': getCSRFToken() },
  });

  let data;
  if (response.status !== 204) {
    try {
      data = await response.json();
    } catch (err) {
      console.error(response, err);
    }
  }

  if (response.ok) return data;

  const err = new Error(
    `Request failed with status ${response.status}: ${response.statusText}`
  );
  err.data = data;
  err.status = response.status;
  err.response = response;
  throw err;
};

export const getAPIErrorMsg = (error) => {
  if (error && error.data) {
    return error.data;
  }
  return {
    detail: 'Something went wrong. Please try again or contact support!',
  };
};

export const apiDocFeedback = (data) => {
  return fetchApi('POST', 'api/docs_cms/feedback', data);
};
