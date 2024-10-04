export type TFood = {
  name: string;
  calories: number;
  carbohydrates: number; // in grams
  protein: number; // in grams
  fat: number; // in grams
  fiber?: number; // in grams, optional
  sugar?: number; // in grams, optional
  vitamins?: string[]; // array of vitamins, optional
  minerals?: string[]; // array of minerals, optional
}

export type TFoodReduced = {
  value: string;
  label: string;
}

export type TMacronutrientData = {
  name: "carbohydrates" | "protein" | "fat";
  value: number;
}
