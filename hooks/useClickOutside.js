import * as React from 'react'

const useClickOutside = (callback, open) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const { current: el } = ref
    const handleClick = (e) => {
      // run callback if open is true and el is not null
      if (open && el && !el.contains(e.target)) {
        console.log('run callback')
        callback(e)
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [open])

  return ref
}

export default useClickOutside
