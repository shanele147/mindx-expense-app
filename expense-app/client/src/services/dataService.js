/**
 * @param {object} options - config object
 * @return {object} DataServices - object for API methods
 */

import axiosInstance from "./axiosInstance";

const DataServices = {
  getTransactionData: () => {
    return axiosInstance.get("/transactions");
  },
};

export default DataServices;
