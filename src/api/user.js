import { ENV, authFetch } from "@/utils";

async function me() {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_ME}`;
    const response = await authFetch(url);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}

async function getAll(page = 1) {
  try {
    const filters = `page=${page}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}?${filters}`;

    const response = await authFetch(url);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}

async function updateAvatar(userId, image) {
  try {
    const url = `${ENV.MEDIA_API}/${userId}.jpg`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: image,
    };

    const response = await authFetch(url, params);

    if (response.status !== 200) throw response;

    return true;
  } catch (error) {
    throw error;
  }
}

async function updateMe(data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_ME}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await authFetch(url, params);

    if (response.status !== 200) throw response;

    return true;
  } catch (error) {
    throw error;
  }
}

export const userCtrl = {
  me,
  getAll,
  updateAvatar,
  updateMe,
};
