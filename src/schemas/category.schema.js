import { z } from "zod";

export const CategorySchema = z.object({
  name: z
      .string()
      .min(1, 'CategoryName Required')
      .max(200, 'CategoryName maximum 200 character.'),
});
