import {NextResponse} from "next/server";
import { foods } from "@/data";

export async function GET() {
  return NextResponse.json(foods)
}