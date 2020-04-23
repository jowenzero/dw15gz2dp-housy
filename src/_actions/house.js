import { GET_HOUSES } from "../constants/action-types";
import { API } from "../config/api";

export const getHouses = () => {
  return {
    type: GET_HOUSES,
    async payload() {
      try {
        const houses = await API.get("/houses");
        return houses.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};