import type { Field } from 'payload'

import { defaultCuetPageContent } from '@/data/defaults/student-hub/cuet'
import { examPrepPageGroupField } from './examPrepPage'

export const cuetPageFields: Field[] = [
  examPrepPageGroupField(
    'cuetPage',
    'CUET Forensic Science (SCQP13) page copy and structured content.',
    defaultCuetPageContent,
  ),
]
