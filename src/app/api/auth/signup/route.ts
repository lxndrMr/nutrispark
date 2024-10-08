import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";
import WelcomeTemplate from "@/app/emails/email-template";

const SignUpSchema = z.object({
  email: z.string().email("Invalid email").min(2).max(50),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long") // Minimum 8 caractères
    .max(50)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Au moins une majuscule
    .regex(/[0-9]/, "Password must contain at least one digit") // Au moins un chiffre
    .regex(/[\W_]/, "Password must contain at least one special character"), // Au moins un caractère spécial
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = SignUpSchema.parse(body); // eslint-disable-line @typescript-eslint/no-unused-vars

    await resend.emails.send({
      from: "Tests Resend <onboarding@resend.dev>", //Expéditeur , Créer Nom de domaine et configurer sur Resend
      to:
        process.env.ENVIRONMENT === "production"
          ? email
          : "delivered@resend.dev",
      subject: "Welcome to NutriSpark",
      react: WelcomeTemplate({ email }),
    });

    return NextResponse.json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
