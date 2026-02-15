import { z } from 'zod'

export const eventCategorySchema = z.enum([
  'hackathon',
  'meetup',
  'conference',
  'workshop',
  'webinar',
  'bootcamp',
])

export const eventStatusSchema = z.enum([
  'upcoming',
  'ongoing',
  'completed',
  'cancelled',
])

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  endDate: z.string().optional(),
  location: z.string(),
  isOnline: z.boolean(),
  onlineUrl: z.string().url().optional().or(z.literal('')),
  category: eventCategorySchema,
  status: eventStatusSchema,
  imageUrl: z.string().url().optional().or(z.literal('')),
  organizer: z.string(),
  organizerUrl: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()),
  upvotes: z.number(),
  maxAttendees: z.number().positive().optional(),
  currentAttendees: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const createEventSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be at most 2000 characters'),
  date: z.string()
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  endDate: z.string()
    .refine((val) => val === '' || !isNaN(Date.parse(val)), 'Invalid end date format')
    .optional(),
  location: z.string()
    .min(2, 'Location must be at least 2 characters')
    .max(200, 'Location must be at most 200 characters'),
  isOnline: z.boolean(),
  onlineUrl: z.string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),
  category: eventCategorySchema,
  imageUrl: z.string()
    .url('Invalid image URL')
    .optional()
    .or(z.literal('')),
  organizer: z.string()
    .min(2, 'Organizer name must be at least 2 characters')
    .max(100, 'Organizer name must be at most 100 characters'),
  organizerUrl: z.string()
    .url('Invalid organizer URL')
    .optional()
    .or(z.literal('')),
  tags: z.string()
    .transform((val) => val.split(',').map(t => t.trim()).filter(Boolean))
    .pipe(z.array(z.string().min(1)).min(1, 'At least one tag is required').max(10, 'Maximum 10 tags allowed')),
  maxAttendees: z.string()
    .transform((val) => val ? parseInt(val, 10) : undefined)
    .pipe(z.number().positive().int().max(100000).optional()),
})

export const updateEventSchema = createEventSchema.partial()

export type CreateEventInput = z.infer<typeof createEventSchema>
export type UpdateEventInput = z.infer<typeof updateEventSchema>