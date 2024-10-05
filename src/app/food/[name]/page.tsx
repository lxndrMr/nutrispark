"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useState, useEffect } from "react";
import { Undo2, TrendingUp } from "lucide-react";

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

  const fetchFood = async () => {
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
  };

  useEffect(() => {
    if (params.name) {
      const initialize = async () => {
        await fetchFood();
      };
      initialize();
    }
  }, [params.name]);

  return (
    <>
      {!isLoading && food && macronutriments ? (
        <div className="p-8 text-white">
          <Undo2
            className="cursor-pointer text-white mb-5"
            onClick={() => router.push("/")}
          />
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            {food.name}
          </h1>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0">
              <Card className="flex flex-col mb-4">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Pie Chart - Donut</CardTitle>
                  <CardDescription>January - June 2024</CardDescription>
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
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                  <div className="text-center mt-4">
                    <span className="inline-block w-3 h-3 bg-[hsl(var(--chart-2))] mr-2 ml-4 ">
                      {" "}
                    </span>{" "}
                    Carbohydrates
                    <span className="inline-block w-3 h-3 bg-[hsl(var(--chart-4))] mr-2 ml-4">
                      {" "}
                    </span>{" "}
                    Protein
                    <span className="inline-block w-3 h-3 bg-[hsl(var(--chart-3))] mr-2 ml-4">
                      {" "}
                    </span>{" "}
                    Fat
                  </div>
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
                  <div className="mb-4 p-4 text-white bg-gray-800 shadow-inner w-full flex ">
                    {/* pas de border radius?  */}
                    <div className="w-5 h-5 bg-[hsl(var(--chart-2))] border border-gray-700 mr-3">
                      {" "}
                    </div>
                    <div>
                      Carbohydrates :{" "}
                      <span className="font-medium">{food.carbohydrates}g</span>
                    </div>
                  </div>
                  <div className="mb-4 p-4 text-white bg-gray-800 shadow-inner w-full flex">
                    {/* pas de border radius?  */}
                    <div className="w-5 h-5 bg-[hsl(var(--chart-4))] border border-gray-700 mr-3">
                      {" "}
                    </div>
                    <div>
                      Portein :{" "}
                      <span className="font-medium">{food.protein}g</span>
                    </div>
                  </div>
                  <div className="mb-4 p-4 text-white bg-gray-800 shadow-inner w-full flex">
                    {/* pas de border radius?  */}
                    <div className="w-5 h-5 bg-[hsl(var(--chart-3))] border border-gray-700 mr-3">
                      {" "}
                    </div>
                    <div>
                      Fat : <span className="font-medium">{food.fat}g</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-4 flex flex-col">
                  <div className="flex items-center mb-2">
                    <Image
                      src="/vitamins.png"
                      alt="vitamins"
                      width={30}
                      height={30}
                    />
                    <div className="ml-3">
                      <span className="font-semibold">Vitamins : </span>
                      {food.vitamins?.join(", ")}
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <Image
                      src="/minerals.png"
                      alt="minerals"
                      width={30}
                      height={30}
                    />
                    <div className="ml-3">
                      <span className="font-semibold">Minerals : </span>
                      {food.minerals?.join(", ")}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <section>
          <p className="text-2xl">Loading...</p>
        </section>
      )}
    </>
  );
};

export default FoodPage;
