/**
 * Define function
 * @param {string} type Type of action
 * @param {object} payload Object of action
 * @return {object} action for reducer
 */

const actionCreator = (type, payload) => {
  return {
    type,
    payload,
  };
};

export default actionCreator;
