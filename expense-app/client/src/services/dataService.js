/**
 * @param {object} options - config object
 * @return {object} DataServices - object for API methods
 */

import axiosInstance from "./axiosInstance";

const DataServices = {
  getTransactionData: () => {
    return axiosInstance.get("/transactions").then((response) => response.data);
  },
  getData: () => {
    return axiosInstance
      .get("/expense-app")
      .then((response) => response.data.data);
  },
};

export default DataServices;
