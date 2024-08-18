const colors = require("colors");

colors.setTheme({
  success: 'green',
  info: 'cyan',
  warning: 'yellow',
  error: 'red'
})


 exports.successMessage = (msg) => {
    console.log(`[Success] - ${msg}`.success)
  }

  exports.infoMessage = (msg) => {
    console.log(`[Info] - ${msg}`.info)
  }

  exports.warningMessage = (msg) => {
    console.log(`[Warning] - ${msg}`.warning)
  }

  exports.errorMessage = (msg) => {
    console.log(`[Error] - ${msg}`.error)
  }