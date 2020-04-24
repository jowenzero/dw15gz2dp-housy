import { GET_TRANSACTIONS, GET_HISTORY, GET_BOOKING } from "../constants/action-types";
import { API, setAuthToken } from "../config/api";

export const getTransactions = () => {
  return {
    type: GET_TRANSACTIONS,
    async payload() {
      try {
        const token = localStorage.getItem('userToken');
        setAuthToken(token);
        const transaction = await API.get("/user/transaction");
        return transaction.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const getHistory = () => {
  return {
    type: GET_HISTORY,
    async payload() {
      try {
        const token = localStorage.getItem('userToken');
        setAuthToken(token);
        const history = await API.get("/user/history");
        return history.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const getBooking = () => {
  return {
    type: GET_BOOKING,
    async payload() {
      try {
        const token = localStorage.getItem('userToken');
        setAuthToken(token);
        const booking = await API.get("/user/booking");
        return booking.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};