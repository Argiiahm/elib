import { z } from 'zod';

export const AcceptBorrowSchmea = z.object({
  dueDate: z.coerce.date(),
});
