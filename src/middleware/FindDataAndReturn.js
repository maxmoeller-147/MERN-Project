function verifyFindDataAndReturn(data, name){
  if (data) {
    response.json(data)
  } else {
    return next(new Error(`${name} not found!`))
  }
};
module.exports = { verifyFindDataAndReturn }