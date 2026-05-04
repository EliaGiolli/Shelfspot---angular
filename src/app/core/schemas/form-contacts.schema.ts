import { z } from 'zod';
import { FormStatus } from '../../shared/types/custom-components-types';

export const ContactsFormSchema = z.object({
    name: z.string().min(3).nonempty(),
    email: z.string().email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    message: z.string().min(4).max(100),
    status: z.nativeEnum(FormStatus)
});

