import { RefreshIcon, UploadIcon } from '@heroicons/react/outline'
import Modal from '../../Modal'
import ModalHeader from '../ModalHeader'
import ModalHeaderButton from '../ModalHeaderButton'
import Product from './Product'

const EditProductModal = ({
  open,
  onClose,
  setCategories,
  product,
  category,
}) => {
  return (
    <Modal {...{ open, onClose }}>
      <ModalHeader
        title="Edit Product"
        logo={category.logoImg}
        rightMenu={
          <>
            <ModalHeaderButton
              //   onClick={resetHandler}
              //   disabled={newProducts.length == 0}
              variant="red"
              fill="outlined"
              Icon={RefreshIcon}
            >
              Reset
            </ModalHeaderButton>
            <ModalHeaderButton
              //   onClick={saveNewProducts}
              //   disabled={
              //     newProducts.length == 0 || Object.keys(errors).length > 0
              //   }
              variant="green"
              fill="solid"
              Icon={UploadIcon}
            >
              Save
            </ModalHeaderButton>
          </>
        }
      />
      <div className="overflow-auto p-5 space-y-6">
        <Product
          product={product}
          category={category}
          onTitleChange={() => {}}
          onPriceChange={() => {}}
          onStockChange={() => {}}
          onSubCategoryChange={() => {}}
        />
      </div>
    </Modal>
  )
}

export default EditProductModal
