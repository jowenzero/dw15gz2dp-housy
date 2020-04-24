import { GET_TRANSACTIONS } from "../constants/action-types";
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