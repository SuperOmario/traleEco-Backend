const http = require("http");
const nodemailer = require("nodemailer");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });

    const fromEmail = "skadiri194@gmail.com";
    const toEmail = "skadiri194@gmail.com";

    const transporter = nodemailer.createTransport({
      host: "gmail",
      port: 587,
      secure: false, // use SSL
      debug: true,
      auth: {
        user: "skadiri194@gmail.com",
        pass: "Apple201@",
      },
    });
    transporter.sendMail(
      {
        from: fromEmail,
        to: toEmail,
        subject: "Regarding forget password request",
        text: "This is forget password response from your app",
        html: "<p>Your password is <b>sample</b></p>",
      },
      function (error, response) {
        if (error) {
          console.log("Failed in sending mail");
          console.dir({ success: false, existing: false, sendError: true });
          console.dir(error);
          res.end("Failed in sending mail");
        } else {
          console.log("Successful in sending email");
          console.dir({ success: true, existing: false, sendError: false });
          console.dir(response);
          res.end("Successful in sending email");
        }
      }
    );
  })
  .listen(8000);
console.log("Server listening on port 8000");
