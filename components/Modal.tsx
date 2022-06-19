import { useEffect } from 'react'

const Modal = ({ children, open, onClose }) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [open])

  return (
    open && (
      <>
        <div onClick={onClose} className="fixed z-50 inset-0 bg-black/75"></div>
        <div className="fixed z-50 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full md:min-w-[450px] max-w-[650px] h-full sm:max-h-[85%] bg-white sm:rounded-2xl overflow-auto">
          {children}
        </div>
      </>
    )
  )
}

export default Modal
