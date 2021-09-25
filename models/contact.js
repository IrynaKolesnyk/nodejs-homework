const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      minLength: 2,
    },
    phone: {
      type: String,
      required: [true, "Set phone number"],
      minLength: 2,
      maxLength: 20,
    },
    favorite: {
      type: Boolean,
      enum: ["false", "true"],
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(7).max(20).required(),
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema };
