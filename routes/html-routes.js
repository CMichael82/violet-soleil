const nodemailer = require('nodemailer');

module.exports = function (app) {

	app.get('/', function (req, res) {
		res.render('home');
	});
	app.get('/gallery', function (req, res) {
		res.render('gallery');
	});

	app.get('/shows', function (req, res) {
		res.render('shows');
	});

	app.get('/contact', function (req, res) {
		res.render('contact');
	});

	app.post('/send', (req, res) => {
		const output =
			`<p>You have a new contact request</p>
			<h3>Contact Details: </h3>
			<ul>
				<li>${req.body.first_name}</li>
				<li>${req.body.last_name}</li>
				<li>${req.body.email}</li>
			</ul>
			<h3>Message</h3>
			<p>${req.body.message}</p>`;

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: account.user, // generated ethereal user
				pass: account.pass // generated ethereal password
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// setup email data with unicode symbols
		let mailOptions = {
			from: '"Fred Foo 👻" <foo@example.com>', // sender address
			to: "bar@example.com, baz@example.com", // list of receivers
			subject: "Hello ✔", // Subject line
			text: "Hello world?", // plain text body
			html: output
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log("Message sent: %s", info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		});

	});

};