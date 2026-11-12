import { Children, isValidElement, type ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale'

interface Props {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  stagger?: boolean
}

/**
 * Keeps reveal-section layout without scroll observers or animation work.
 */
export function AnimateOnScroll({
  children,
  className = '',
  stagger = false,
}: Props) {
  if (stagger) {
    return (
      <div className={className}>
        {Children.map(children, (child, i) =>
          isValidElement(child) ? (
            <div key={i}>{child}</div>
          ) : (
            child
          ),
        )}
      </div>
    )
  }

  return <div className={className}>{children}</div>
}
