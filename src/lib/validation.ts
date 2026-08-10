import { z } from 'zod';

/** Max lengths to keep the DB and UI sane. */
export const NAME_MAX = 50;
export const MESSAGE_MAX = 500;

/**
 * Guestbook entry input.
 * - trim whitespace
 * - collapse internal whitespace runs
 * - strip HTML/script entirely (defense in depth; content is also
 *   React-escaped on render, but we never store markup)
 */
export const guestbookSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please leave your name.')
    .max(NAME_MAX, `Name must be ${NAME_MAX} characters or fewer.`)
    .regex(/^[\p{L}\p{N}\s.'-]+$/u, 'Name contains invalid characters.')
    .transform((v) => v.replace(/\s+/g, ' ')),
  message: z
    .string()
    .trim()
    .min(1, 'Please leave a message.')
    .max(MESSAGE_MAX, `Message must be ${MESSAGE_MAX} characters or fewer.`)
    .transform((v) =>
      v
        .replace(/<[^>]*>/g, '')
        .replace(/[<>]/g, '')
        .replace(/\s+/g, ' ')
    ),
});

export type GuestbookInput = z.infer<typeof guestbookSchema>;
