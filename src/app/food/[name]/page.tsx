"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useState, useEffect, useCallback } from "react";
import { Undo2 } from "lucide-react";

import { TMacronutrientData, TFood } from "@/types";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple pie chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  carbohydrates: {
    label: "carbohydrates",
    color: "hsl(var(--chart-2))",
  },
  protein: {
    label: "protein",
    color: "hsl(var(--chart-4))",
  },
  fat: {
    label: "fat",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const FoodPage = ({ params }: { params: { name: string } }) => {
  const router = useRouter();

  const [food, setFood] = useState<TFood | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [macronutriments, setMacronutriments] = useState<TMacronutrientData[]>(
    []
  );

  // useCallback : Cela mémorise la fonction fetchFood et la recrée uniquement lorsque la dépendance (params.name) change.

  const fetchFood = useCallback(async () => {
    try {
      const APIQueryURL = `/api/foods/${params.name}`;
      const response = await fetch(APIQueryURL);

      // Vérification du statut de la réponse
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const macronutrimentsDatas: TMacronutrientData[] = [
        {
          name: "carbohydrates",
          value: data.carbohydrates,
          fill: "var(--color-carbohydrates)",
        },
        { name: "protein", value: data.protein, fill: "var(--color-protein)" },
        { name: "fat", value: data.fat, fill: "var(--color-fat)" },
      ];

      setMacronutriments(macronutrimentsDatas);
      setFood(data);
    } catch (error) {
      console.log("Error fetching food data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [params.name]);

  useEffect(() => {
    if (params.name) {
      const initialize = async () => {
        await fetchFood();
      };
      initialize();
    }
  }, [params.name, fetchFood]);

  return (
    <>
      {!isLoading && food && macronutriments ? (
        <section className="p-8">
          <Undo2
            className="cursor-pointer text-white mb-5"
            onClick={() => router.push("/")}
          />
          <section className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0">
              <Card className="flex flex-col mb-4">
                <CardHeader className="items-center pb-0">
                  <CardTitle className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                    {food.name}
                  </CardTitle>
                  <CardDescription>
                    The nutritional values of {params.name}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={macronutriments}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <ul className="flex text-center mt-4">
                    <li>
                      <span className="inline-block w-3 h-3 bg-[hsl(var(--chart-2))] mr-2 ml-4 "></span>
                      Carbohydrates
                    </li>
                    <li>
                      <span className="inline-block w-3 h-3 bg-[hsl(var(--chart-4))] mr-2 ml-4"></span>
                      Protein
                    </li>
                    <li>
                      <span className="inline-block w-3 h-3 bg-[hsl(var(--chart-3))] mr-2 ml-4"></span>
                      Fat
                    </li>
                  </ul>
                </CardFooter>
              </Card>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3 mb-8 md:mb-0 md:ml-8">
              <Card className="flex flex-col">
                <CardHeader className="items-center pb-0 mb-4">
                  <CardTitle>Nutritional Information</CardTitle>
                  <CardDescription>per 100 grams :</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className=" mb-4 p-4 bg-gray-800 shadow-inner w-full flex flex-col rounded-lg">
                    <li>
                      Calories :
                      <span className="font-medium">{food.calories} cal</span>
                    </li>
                    <li className="flex items-center">
                      <span
                        className="inline-block w-5 h-5 bg-[hsl(var(--chart-2))] border border-gray-700 mr-3"
                        aria-label="Carbohydrates color indicator"
                      ></span>
                      Carbohydrates :
                      <span className="font-medium">
                        {food.carbohydrates} g
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span
                        className="inline-block w-5 h-5 bg-[hsl(var(--chart-4))] border border-gray-700 mr-3"
                        aria-label="Protein color indicator"
                      ></span>
                      Protein :
                      <span className="font-medium">{food.protein} g</span>
                    </li>
                    <li className="flex items-center">
                      <span
                        className="inline-block w-5 h-5 bg-[hsl(var(--chart-3))] border border-gray-700 mr-3"
                        aria-label="Fat color indicator"
                      ></span>
                      Fat : <span className="font-medium">{food.fat} g</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-4 flex flex-col">
                  <section className="flex items-center mb-2">
                    <Image
                      src="/vitamins.png"
                      alt="vitamins"
                      width={30}
                      height={30}
                    />
                    <p className="ml-3">
                      <strong>Vitamins : </strong>
                      <span>{food.vitamins?.join(", ")}</span>
                    </p>
                  </section>

                  <section className="flex items-center mb-2">
                    <Image
                      src="/minerals.png"
                      alt="minerals"
                      width={30}
                      height={30}
                    />
                    <p className="ml-3">
                      <strong>Minerals : </strong>
                      <span>{food.minerals?.join(", ")}</span>
                    </p>
                  </section>
                </CardFooter>
              </Card>
            </div>
          </section>
        </section>
      ) : (
        <section className="flex flex-col justify-center items-center h-screen">
          <p className="text-2xl">Loading...</p>
        </section>
      )}
    </>
  );
};

export default FoodPage;
