module.exports = class RequestHandlers {
  constructor(storage) {
    this.storage = storage;
  }
  getDocument(req, res, next) {
    next({ doc: "docdata" });
  }
  getUser(req, res, next) {
    res.send({ user: "guest" });
    next();
  }
};
