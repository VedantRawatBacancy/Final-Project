const errorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  console.log(status)
  console.log(message)
  console.log(data)
  res.status(status).json({
    message,
    data
  })
}

module.exports = errorHandler
