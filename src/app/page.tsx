"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { TFood, TFoodReduced } from "@/types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [foods, setFoods] = useState<TFoodReduced[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const fetchFoods = async () => {
    try {
      const response = await fetch("/api/foods/all");
      const data = await response.json();
      const foodsReduced: TFoodReduced[] = data.map((food: TFood) => ({
        value: food.name.toLowerCase().replace(/\s/g, "-"), //Remplace les espaces par des tirets
        label: food.name,
      }));
      setFoods(foodsReduced);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchFoods();
      setIsLoading(false);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (value.length > 0) {
      router.push(`/food/${value}`);
    }
  }, [value, router]);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {!isLoading ? (
        <>
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to <span className="title_colored">Nutrispark</span>
          </h1>
          <p className="text-lg m-8 text-center">
            Discover the nutritional value of your favorite foods. Use the
            search below to get started.
          </p>
          <section>
            <h2 className="sr-only">Food Selector</h2>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[300px] justify-between"
                >
                  {value
                    ? foods.find((food) => food.value === value)?.label
                    : "Select food..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search food..." />
                  <CommandList>
                    <CommandEmpty>No food found.</CommandEmpty>
                    <CommandGroup>
                      <ul>
                        {foods.map((food) => (
                          <li key={food.value}>
                            <CommandItem
                              value={food.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === food.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {food.label}
                            </CommandItem>
                          </li>
                        ))}
                      </ul>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </section>
        </>
      ) : (
        <section>
          <p className="text-2xl">Loading...</p>
        </section>
      )}
    </main>
  );
}
