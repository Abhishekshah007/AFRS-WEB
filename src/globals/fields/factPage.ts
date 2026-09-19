import type { Field } from 'payload'

import { defaultFactPageContent } from '@/data/defaults/student-hub/fact'
import { examPrepPageGroupField } from './examPrepPage'

export const factPageFields: Field[] = [
  examPrepPageGroupField(
    'factPage',
    'FACT / FACT Plus page copy and structured content.',
    defaultFactPageContent,
  ),
]
