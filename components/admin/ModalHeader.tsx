interface Props {
  logo?: string
  title: string
  rightMenu?: React.ReactNode
}

const ModalHeader = ({ logo, title, rightMenu }: Props) => {
  return (
    <header className="sticky top-0 z-[100] bg-white p-5 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-3">
        {logo && <img src={logo} className="w-10 h-10 rounded-2xl" />}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {rightMenu && (
        <div className="flex items-center space-x-4">{rightMenu}</div>
      )}
    </header>
  )
}

export default ModalHeader
