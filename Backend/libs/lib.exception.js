class Error404 extends Error {
  constructor(message) {
    super(message);
    this.name = "Error404"
  }
}

class Error403 extends Error {
  constructor(message) {
    super(message);
    this.name = "Error403"
  }
}

class Error401 extends Error {
  constructor(message) {
    super(message);
    this.name = "Error401"
  }
}

const ExceptionHandler = (error, res) => {
  console.log(error)
  switch (error.name) {
    case "MongoServerError":
      return res.status(403).json({ detail: "Pastikan data yang dikirim benar dan tidak berisi duplikasi data!" })
    case "CastError":
      return res.status(500).json({detail: "Pastikan format id benar"})
    case "Error404":    
      return res.status(404).json({detail: error.message || "Data not found"});
    case "Error401":
      return res.status(401).json({detail: error.message || "Unauthorized"})
    case "Error403":
      return res.status(403).json({detail: error.message || "Forbidden"})
    default:
      return res.status(500).json({ detail: "Something when wrong, please try again later!" })
  }
}

module.exports = {
  Error404,
  Error401,
  Error403,
  ExceptionHandler
}