const moment = require("moment");

module.exports = class Storage {
  constructor() {
    this.config = {};
  }

  getDocument(data) {
    console.log(data);
    return { doc: "doc data" };
  }
  getUser(data) {
    console.log(data);
    return { user: "username" };
  }
};
