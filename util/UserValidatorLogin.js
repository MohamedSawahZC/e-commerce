const Ajv = require("ajv").default;

const schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
      minLength: 5,
    },
  },
  required: ["password", "email"],
};

const ajv = new Ajv();
module.exports = ajv.compile(schema);
