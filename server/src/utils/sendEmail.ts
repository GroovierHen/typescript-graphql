import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail(email: string, url: string) {
  const msg = {
    to: email,
    from: "hafiz1tayab@gmail.com",
    subject: "Confirm Your Email",
    text: `Please paste this in URL bar ${url}`,
    html: `<a href="${url}">${url}</a>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
}
