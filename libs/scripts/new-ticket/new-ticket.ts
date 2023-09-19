import { Dialog } from "@libs/shared/dialog";

export async function newTicketScript(dialog: Dialog) {
  const name = await dialog.prompt("What is your name?");

  const email = await name.prompt("What is your email?");

  const description = await email.prompt("What is your issue?");

  const confirm = await description.prompt(
    `Please confirm:\n\nName: ${name.message}\nEmail: ${email.message}\nDescription: ${description.message}`
  );

  if (confirm.message.toLowerCase().startsWith("y")) {
    await confirm.answer("Thank you for your ticket!");
  } else {
    await confirm.answer("Sorry to hear that, please try again.");
  }
}
