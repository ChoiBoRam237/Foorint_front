import axios from "axios";
import { BASE_URL } from "@env";

/**
 * @brief Api 주소
 */

// 토큰 불필요
export const publicBase = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
});

// 토큰 필요
export const privateBase = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
});