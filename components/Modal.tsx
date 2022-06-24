/* eslint-disable react/display-name */
import { useEffect, forwardRef, ForwardedRef } from 'react'

interface Props {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

const Modal = forwardRef(
  ({ children, open, onClose }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    useEffect(() => {
      if (open) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    }, [open])

    return (
      open && (
        <div className="fixed z-50 inset-0">
          {/* OVERLAY */}
          <div onClick={onClose} className="fixed inset-0 bg-black/75"></div>
          {/* MODAL BODY */}
          <div
            ref={ref}
            className="fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full md:min-w-[450px] max-w-[650px] h-full sm:h-max sm:max-h-[85%] bg-white sm:rounded-2xl overflow-auto"
          >
            {children}
          </div>
        </div>
      )
    )
  }
)

export default Modal
