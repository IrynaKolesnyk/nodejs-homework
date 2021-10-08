const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "iriska.kolesnik@gmail.com" };
    const result = await sgMail.send(email);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;

// const email = {
//   to: "iriska.kolesnik@gmail.com",
//   from: "iriska.kolesnik@gmail.com",
//   subject: "Test",
//   html: `<p>Test</p>`,
// };

// sgMail.send().then(() => console.log("success")).catch(error => console.log(error.message);)
