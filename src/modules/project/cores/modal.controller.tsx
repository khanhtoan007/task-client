import { useState } from 'react'
import type { ProjectRequest } from '../cores/type'
import { createProject } from '@/modules/project/services/project.service'
import toast from 'react-hot-toast'

export const useModalController = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<any>(null)

  const openModal = (data: any) => {
    setIsModalOpen(true)
    setModalData(data)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalData(null)
  }

  const handleSubmit = async (data: ProjectRequest) => {
    try {
      const response = await createProject(data)
      if (response.success) {
        toast.success('Project created successfully!')
        closeModal()
      } else {
        toast.error(response.message || 'Failed to create project')
      }
    } catch (error) {
      console.error('Error creating project:', error)
      toast.error('Failed to create project. Please try again.')
    }
  }

  return {
    isModalOpen,
    modalData,
    openModal,
    closeModal,
    handleSubmit,
  }
}
