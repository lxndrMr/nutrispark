import { NextResponse } from "next/server";
import { foods } from "@/data";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  // Normaliser le paramètre de nom
  const normalizedName = params.name.toLowerCase();

  // Trouver l'aliment correspondant
  const foodItem = foods.find((food) => 
    food.name.toLowerCase().replace(/\s/g, "-") === normalizedName
  );

  if (foodItem) {
    return NextResponse.json(foodItem, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return NextResponse.json({ message: "Food not found" }, {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },  
    });
  }
}