const sendErrorResponse = async (res, error, status) => {
  res.status(status ? status : 500).end(error.message);
};
