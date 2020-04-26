import { GET_HOUSES, GET_CITY } from "../constants/action-types";
import { API } from "../config/api";

export const getHouses = (typeRent, budget) => {
  return {
    type: GET_HOUSES,
    async payload() {
      try {
        if (typeRent || budget)
        {
          const houses = await API.get("/houses", {
            params: {
              typeRent: typeRent,
              belowPrice: budget
            }
          });
          return houses.data;
        }
        else
        {
          const houses = await API.get("/houses")
          return houses.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const getCity = (CityId) => {
  return {
    type: GET_CITY,
    async payload() {
      try {
        const houses = await API.get("/houses", {
          params: {
            CityId: CityId
          }
        });
        return houses.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};