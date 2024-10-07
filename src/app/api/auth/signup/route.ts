import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const SignUpSchema = z.object({
  email: z.string().min(1, { message: "Required." }).email(),
  password: z.string().min(8).max(100),
});

export async function POST({ request }: { request: NextRequest }) {
  try {
    const body = await request.json();
    const { email, password } = SignUpSchema.parse(body);
    return NextResponse.json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error });
  }
}
