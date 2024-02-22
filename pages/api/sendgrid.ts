// import sendgrid from '@sendgrid/mail';
// const sendgridKey = process.env.NEXT_PUBLIC_SENDGRID_KEY;
// // @ts-ignore
// sendgrid.setApiKey(sendgridKey);

// async function sendMail(req: any, res: any) {
//   console.log('req', req);
//   console.log('req.body', req.body);
//   console.log('req.body.to', req.body.to);
//   console.log('req.body.from', req.body.from);
//   console.log('req.body.subject', req.body.subject);
//   console.log('req.body.text', req.body.text);
//   const msg = {
//     to: req.body.to,
//     from: req.body.from,
//     name: req.body.name,
//     subject: `${req.body.subject} - buddyhead.com contact form`,
//     text: req.body.text,
//     html: `
//     <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="utf-8">

//         <title>Buddyhead.com Email</title>
//         <meta name="description" content="buddyhead email">
//         <meta name="author" content="buddyhead email">
//       <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//       </head>
//       <body>
//         ${req.body.html}
//       </body>
//     `,
//   };
//   console.log('msg', msg);
//   try {
//     const response: any = await sendgrid.send(msg);
//     console.log('response', response);
//     console.log('response.data', response.data);
//     return res.status(200).json({ message: 'Message sent successfully' });
//   } catch (error: any) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//     return res.status(error.statusCode || 500).json({ message: error.message });
//   }
// }

// export default sendMail;
