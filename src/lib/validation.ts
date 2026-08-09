import { z } from 'zod';

/**
 * All validation rules live here. Every value that crosses a trust boundary
 * (cookies, forms, query params) is funneled through these schemas.
 */

export const NAME_MAX = 60;
export const MESSAGE_MAX = 1000;
export const LOCATION_MAX = 80;
export const PAGE_SIZE_DEFAULT = 20;
export const PAGE_SIZE_MAX = 50;

/** URLs from the request — decode then validate. */
export const nextPathSchema = z.string().trim().max(200);

export const entrySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please share your name.')
    .max(NAME_MAX, `Name must be ${NAME_MAX} characters or fewer.`)
    .regex(/^[\p{L}\p{N} .'\-_]+$/u, 'Name contains unsupported characters.'),
  message: z
    .string()
    .trim()
    .min(3, 'Your message is a little short.')
    .max(MESSAGE_MAX, `Message must be ${MESSAGE_MAX} characters or fewer.`)
    .refine((v) => !/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(v), 'Message contains control characters.'),
  location: z
    .string()
    .trim()
    .max(LOCATION_MAX, `Location must be ${LOCATION_MAX} characters or fewer.`)
    .regex(/^[\p{L}\p{N} .'\-_,()]*$/u, 'Location contains unsupported characters.')
    .optional()
    .or(z.literal('')),
});

export type EntryInput = z.infer<typeof entrySchema>;

export const cursorSchema = z
  .string()
  .regex(/^\d+$/, 'Malformed cursor.')
  .transform((v) => Number(v))
  .refine((v) => Number.isSafeInteger(v) && v > 0, 'Malformed cursor.')
  .optional();

export const pageSizeSchema = z
  .string()
  .regex(/^\d+$/, 'Malformed page size.')
  .transform((v) => Number(v))
  .refine((v) => Number.isSafeInteger(v) && v >= 1 && v <= PAGE_SIZE_MAX, `Page size must be between 1 and ${PAGE_SIZE_MAX}.`)
  .optional();

export const idParamSchema = z
  .string()
  .regex(/^\d+$/, 'Malformed id.')
  .transform((v) => Number(v))
  .refine((v) => Number.isSafeInteger(v) && v > 0, 'Malformed id.');

export const adminLoginSchema = z.object({
  password: z.string().min(1).max(200),
});

/** Server-side only: admin password must come from env, never code. */
export const adminPasswordSchema = z.string().min(16).max(128);

export type Parsed = { ok: true; data: unknown } | { ok: false; error: string };

/** Safe wrapper that returns a discriminated union instead of throwing. */
export function safeParse<T>(schema: z.ZodType<T>, input: unknown): { ok: true; data: T } | { ok: false; error: string } {
  const result = schema.safeParse(input);
  if (result.success) {
    return { ok: true, data: result.data };
  }
  return { ok: false, error: result.error.issues[0]?.message ?? 'Invalid input.' };
}
