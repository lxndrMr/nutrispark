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
      const response = await fetch("/api/food/all");
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
    <>
      {!isLoading ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? foods.find((food) => food.value === value)?.label
                : "Select food..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search food..." />
              <CommandList>
                <CommandEmpty>No food found.</CommandEmpty>
                <CommandGroup>
                  {foods.map((food) => (
                    <CommandItem
                      key={food.value}
                      value={food.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === food.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {food.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex justify-center items-center h-screen text-white">
          <p className="text-2xl">Loading...</p>
        </div>
      )}
    </>
  );
}
