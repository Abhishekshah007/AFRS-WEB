// 'use client'

// import { useState, useEffect } from 'react'
// import { X } from 'lucide-react'

// type ModalProps = {
//   isOpen: boolean
//   onClose: () => void
//   title: string
//   children: React.ReactNode
// }

// export function Modal({ isOpen, onClose, title, children }: ModalProps) {
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = 'unset'
//     }
//     return () => {
//       document.body.style.overflow = 'unset'
//     }
//   }, [isOpen])

//   if (!mounted || !isOpen) return null

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//         aria-hidden
//       />
//       <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[20px] bg-white p-8 shadow-2xl">
//         <button
//           onClick={onClose}
//           className="absolute right-6 top-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
//           aria-label="Close modal"
//         >
//           <X className="h-5 w-5" />
//         </button>
//         <h2 className="text-[28px] font-black text-[#071329]">{title}</h2>
//         <div className="mt-6">{children}</div>
//       </div>
//     </div>
//   )
// }
