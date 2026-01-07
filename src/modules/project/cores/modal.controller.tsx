import { useState } from 'react'
import type { ProjectRequest } from '../cores/type'
import { createProject, updateProject } from '@/modules/project/services/project.service'
import toast from 'react-hot-toast'

type ModalControllerOptions = {
  refetchProjects?: () => Promise<void>
}

export const useModalController = ({ refetchProjects }: ModalControllerOptions = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editModalData, setEditModalData] = useState<any>(null)

  const openModal = (data: any) => {
    setIsModalOpen(true)
    setModalData(data)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalData(null)
  }

  const openEditModal = (data: any) => {
    setIsEditModalOpen(true)
    setEditModalData(data)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditModalData(null)
  }

  const handleEditSubmit = async (data: ProjectRequest, id: string) => {
    try {
      const response = await updateProject(data, id)
      if (response.success) {
        toast.success('Project updated successfully!')
        closeEditModal()
        await refetchProjects?.()
      } else {
        toast.error(response.message || 'Failed to update project')
      }
    } catch (error) {
      console.error('Error updating project:', error)
    }
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
    isEditModalOpen,
    editModalData,
    modalData,
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    handleEditSubmit,
    handleSubmit,
  }
}
