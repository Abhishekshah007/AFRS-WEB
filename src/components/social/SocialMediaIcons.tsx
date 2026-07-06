'use client'
import Link from 'next/link'
import type { HeaderSetting } from '@/payload-types'
import Image from 'next/image'

type Props = {
  icons?: HeaderSetting['topBarLeftText3']
}

export default function SocialMediaIcons({ icons }: Props) {
  if (!icons?.length) {
    return null
  }

  return (
    <div className="flex gap-2">
      {icons.map((item) => {
        if (typeof item.icon === 'number' || !item.icon.url) {
          return null
        }

        return (
          <Link key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">
            <Image src={item.icon.url} alt={item.label ?? ''} width={16} height={16} unoptimized />
          </Link>
        )
      })}
    </div>
  )
}
