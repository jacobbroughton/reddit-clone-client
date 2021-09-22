const { validationResult } = require("express-validator")


function returnErrors(req, res) {
  const errors = validationResult(req)

  let validatorFailed = false

  if(!errors.isEmpty()) {
    console.log(errors)
    validatorFailed = res.status(400).json({ errors: errors.array() })
  }

  return validatorFailed
}

module.exports = returnErrors
