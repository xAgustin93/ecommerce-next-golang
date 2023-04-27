import { ENV } from "../constants";

export function getUrlImage(imageName) {
  return `${ENV.MEDIA_URL}/${imageName}.jpg`;
}
