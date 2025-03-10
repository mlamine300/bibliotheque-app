/* eslint-disable @typescript-eslint/no-explicit-any */
import { serve } from "@upstash/workflow/nextjs";
import nodemailer from "nodemailer";
import config from "../../../../../config";
//import emailjs from "@emailjs/browser";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
type InitialData = {
  email: string;
  name: string;
};
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const THREE_DAY_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAY_IN_MS = 30 * ONE_DAY_IN_MS;

export const { POST } = serve<InitialData>(async (context) => {
  const { email, name } = context.requestPayload;

  //const name = "rtyuiok;";
  await context.run("new-signup", async () => {
    await sendEmail(
      `Welcome to the platform MR ${name};\n\ndont forget a king always reads;\n\nRegards Lamine.`,
      email,
      name
    );
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail(
          `Never settele ${name} try to read more \n
           visite our site on :${config.env.prodApiEndPoint}\n
            read more grow more`,
          email,
          name
        );
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail(
          `Keep reading Mr ${name}\n your are the king`,
          email,
          name
        );
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

async function sendEmail(message: string, email: string, name: string) {
  try {
    console.log("sending email............");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.env.nodemailer.emailAdress,
        pass: config.env.nodemailer.emailPassword,
      },
    });

    const mailOptions = {
      from: config.env.nodemailer.emailAdress,
      to: email,
      subject: `welcome ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log("email sended");
    // return Response.json(
    //   { message: "Email sent successfully!" },
    //   { status: 200 }
    // );
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
// async function sendEmail(message: string, email: string, name: string) {
//   // Implement email sending logic here
//   console.log(`Sending ${message} email to ${email}`);
//   const templateParams = {
//     email: email,
//     to_name: name,
//     from_name: "Lamine",
//     message: message,
//   };

//   await emailjs.init({ publicKey: config.env.emailJs.publicKey });
//   await emailjs
//     .send(
//       config.env.emailJs.serviceId,
//       config.env.emailJs.templateId,
//       templateParams,
//       {
//         publicKey: config.env.emailJs.publicKey,
//       }
//     )
//     .then(
//       (response) => {
//         console.log("SUCCESS!", response.status, response.text);
//       },
//       (err) => {
//         console.log("FAILED...", err);
//         throw new Error(err.message);
//       }
//     );
// }

type UserState = "non-active" | "active";

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  if (user.length === 0) return "non-active";

  const now = new Date();
  const timeDiff =
    now.getTime() - new Date(user[0].lastActivityDate!).getTime();
  if (timeDiff < THIRTY_DAY_IN_MS && timeDiff > THREE_DAY_IN_MS)
    return "non-active";

  // Implement user state logic here
  return "active";
};
