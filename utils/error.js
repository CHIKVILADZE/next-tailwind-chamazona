const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.reponse.data.message
    : err.message;
export { getError };
