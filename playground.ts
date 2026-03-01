import { z } from 'zod';

const InvoiceSchema = z.object({
  id: z.string(),
  number: z.string(),
  total: z.number(),
});

export const contract = {
  endpoints: {
    invoices: {
      create: {
        errors: [422],
        method: 'POST',
        path: '/invoices',
        request: {
          body: z.object({
            invoice: InvoiceSchema.pick({
              number: true,
              total: true,
            }),
          }),
        },
        response: {
          body: z.object({
            invoice: InvoiceSchema,
          }),
        },
      },
      show: {
        method: 'GET',
        path: '/invoices/:id',
        pathParams: z.object({
          id: z.string(),
        }),
        response: {
          body: z.object({
            invoice: InvoiceSchema,
          }),
        },
      },
    },
  },
  error: z.object({
    errors: z.record(z.string(), z.array(z.string())).optional(),
    message: z.string(),
  }),
} as const;
