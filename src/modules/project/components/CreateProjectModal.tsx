'use client'

import { Modal, Form, Input, Select, DatePicker, Button } from 'antd'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import type { ProjectRequest } from '../cores/type'
import { ProjectStatus } from '../cores/type'
import dayjs from 'dayjs'

const { TextArea } = Input

interface CreateProjectModalProps {
  isModalOpen: boolean
  closeModal: () => void
  handleSubmit: (data: ProjectRequest, id?: string) => Promise<void>
  mode?: 'create' | 'edit'
  initialValues?: Partial<ProjectRequest> & { id?: string }
}

export const CreateProjectModal = ({
  isModalOpen,
  closeModal,
  handleSubmit: onSubmit,
  mode = 'create',
  initialValues,
}: CreateProjectModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectRequest>({
    defaultValues: {
      name: '',
      description: '',
      status: '',
      start_date: '',
      end_date: '',
    },
  })

  useEffect(() => {
    if (isModalOpen) {
      reset({
        name: initialValues?.name || '',
        description: initialValues?.description || '',
        status: (initialValues?.status as string) || '',
        start_date: initialValues?.start_date || '',
        end_date: initialValues?.end_date || '',
      })
    }
  }, [initialValues, isModalOpen, reset])

  const handleFormSubmit = async (data: ProjectRequest) => {
    await onSubmit(data, initialValues?.id)
    reset()
  }

  const handleCancel = () => {
    reset()
    closeModal()
  }

  return (
    <Modal
      title={mode === 'edit' ? 'Edit Project' : 'Add Project'}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit) as any}>
        <Form.Item
          label="Project Name"
          required
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Project name is required' }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter project name" size="large" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea {...field} placeholder="Enter project description" rows={4} size="large" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          validateStatus={errors.status ? 'error' : ''}
          help={errors.status?.message}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select status" size="large" style={{ width: '100%' }}>
                <Select.Option value={ProjectStatus.DRAFT}>Draft</Select.Option>
                <Select.Option value={ProjectStatus.ACTIVE}>Active</Select.Option>
                <Select.Option value={ProjectStatus.ON_HOLD}>On Hold</Select.Option>
                <Select.Option value={ProjectStatus.COMPLETED}>Completed</Select.Option>
                <Select.Option value={ProjectStatus.CANCELLED}>Cancelled</Select.Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Start Date"
          validateStatus={errors.start_date ? 'error' : ''}
          help={errors.start_date?.message}
        >
          <Controller
            name="start_date"
            control={control}
            rules={{ required: 'Start date is required' }}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                placeholder="Select start date"
                size="large"
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="End Date"
          validateStatus={errors.end_date ? 'error' : ''}
          help={errors.end_date?.message}
        >
          <Controller
            name="end_date"
            control={control}
            rules={{ required: 'End date is required' }}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                placeholder="Select end date"
                size="large"
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
              />
            )}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              {mode === 'edit' ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}
