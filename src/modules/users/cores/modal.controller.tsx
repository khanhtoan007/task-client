import { useState } from 'react'
import type { UserRequest } from './type'
import { createUserContest, updateUser } from '../services/user.service'
import toast from 'react-hot-toast'

export const useModalController = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editModalData, setEditModalData] = useState<any>(null)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openEditModal = (data: any) => {
    setIsEditModalOpen(true)
    setEditModalData(data)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditModalData(null)
  }

  const handleSubmit = async (data: UserRequest) => {
    try {
      const response = await createUserContest(data)
      if (response.success) {
        toast.success('User contest created successfully!')
        closeModal()
      } else {
        toast.error(response.message || 'Failed to create user contest')
      }
    } catch (error) {
      console.error('Error creating user contest:', error)
      toast.error('Failed to create user contest. Please try again.')
    }
  }

  const handleEditSubmit = async (data: UserRequest, id: string) => {
    try {
      const response = await updateUser(data, id)
      if (response.success) {
        toast.success('User updated successfully!')
        closeEditModal()
      } else {
        toast.error(response.message || 'Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Failed to update user. Please try again.')
    }
  }

  return {
    isModalOpen,
    isEditModalOpen,
    editModalData,
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    handleEditSubmit,
    handleSubmit,
  }
}

