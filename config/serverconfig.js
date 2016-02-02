var serversettings = {
	// local box login credentails
	mongooptions : {
      user : "sandbox1admin",
      pass : "Kony@123",
      server: {
          socketOptions: {
          keepAlive: 1
        }
      }
	},
	// Mongo url
	mongourl : "mongodb://localhost:27017/sandboxdb1",
  basicauth : {
      username : "basicauth",
      password : "basicauth"
  }
}
module.exports = serversettings;