const sendOkResponse = async (res, status, payload) => {
  return res.status(status).end(JSON.stringify(payload));
};

export { sendOkResponse };
