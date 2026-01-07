'use client'

import { Modal } from 'antd'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
}

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete this item?',
}: ConfirmDeleteModalProps) => {
  const handleOk = () => {
    onConfirm()
  }

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      onOk={handleOk}
      okText="Delete"
      okButtonProps={{ danger: true }}
      cancelText="Cancel"
    >
      <p>{message}</p>
    </Modal>
  )
}

