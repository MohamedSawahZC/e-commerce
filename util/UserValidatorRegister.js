const Ajv = require("ajv").default;

const schema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      pattern: "^[A-Z][a-z]*$",
    },
    lastName: {
      type: "string",
      pattern: "^[A-Z][a-z]*$",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
      minLength: 5,
    },
    phone: {
      type: "string",
    },
    profilePic: {
      type: "string",
    },
    isAdmin: {
      type: "boolean",
      },
      isSeller: {
        type: "boolean",
      },
      cart: {
          type:"array"
      },
      favorite: {
        type:"array"
    }
  },
  required: ["firstName", "lastName", "password", "email", "phone"],
};

const ajv = new Ajv();
module.exports = ajv.compile(schema);
