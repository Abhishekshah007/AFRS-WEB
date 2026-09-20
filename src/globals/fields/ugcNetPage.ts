import type { Field } from 'payload'

import { defaultUgcNetPageContent } from '@/data/defaults/student-hub/ugc-net'
import { examPrepPageGroupField } from './examPrepPage'

export const ugcNetPageFields: Field[] = [
  examPrepPageGroupField(
    'ugcNetPage',
    'UGC-NET / JRF page copy and structured content.',
    defaultUgcNetPageContent,
  ),
]
