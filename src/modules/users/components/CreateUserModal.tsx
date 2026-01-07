import { Modal, Form, Input, Button, Select, DatePicker } from 'antd'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import type { UserRequest, ContestResponse } from '../cores/type'
import { getContests } from '../services/user.service'
import dayjs from 'dayjs'

interface CreateUserModalProps {
  isModalOpen: boolean
  closeModal: () => void
  handleSubmit: (data: UserRequest, id?: string) => Promise<void>
  mode?: 'create' | 'edit'
  initialValues?: Partial<UserRequest> & { id?: string }
}

export const CreateUserModal = ({
  isModalOpen,
  closeModal,
  handleSubmit: onSubmit,
  mode = 'create',
  initialValues,
}: CreateUserModalProps) => {
  const [contests, setContests] = useState<ContestResponse[]>([])
  const [loadingContests, setLoadingContests] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserRequest>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      contest: '',
      dob: '',
      sex: '',
    },
  })

  useEffect(() => {
    if (isModalOpen) {
      reset({
        name: initialValues?.name || '',
        email: initialValues?.email || '',
        phone: initialValues?.phone || '',
        contest: initialValues?.contest || '',
        dob: initialValues?.dob || '',
        sex: initialValues?.sex || '',
      })
      
      setLoadingContests(true)
      getContests()
        .then((res) => {
          setContests(res.data)
        })
        .catch((error) => {
          console.error('Error fetching contests:', error)
        })
        .finally(() => {
          setLoadingContests(false)
        })
    }
  }, [initialValues, isModalOpen, reset])

  const handleFormSubmit = async (data: UserRequest) => {
    await onSubmit(data, initialValues?.id)
    reset()
  }

  const handleCancel = () => {
    reset()
    closeModal()
  }

  return (
    <Modal
      title={mode === 'edit' ? 'Edit User' : 'Register Contest'}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit) as any}>
        <Form.Item
          label="Name"
          required
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter name" size="large" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          required
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter email" size="large" type="email" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Phone"
          required
          validateStatus={errors.phone ? 'error' : ''}
          help={errors.phone?.message}
        >
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'Phone is required' }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter phone" size="large" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Contest"
          required
          validateStatus={errors.contest ? 'error' : ''}
          help={errors.contest?.message}
        >
          <Controller
            name="contest"
            control={control}
            rules={{ required: 'Contest is required' }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select contest"
                size="large"
                loading={loadingContests}
                options={contests.map((contest) => ({
                  label: contest.title,
                  value: contest.id,
                }))}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          required
          validateStatus={errors.dob ? 'error' : ''}
          help={errors.dob?.message}
        >
          <Controller
            name="dob"
            control={control}
            rules={{ required: 'Date of Birth is required' }}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                placeholder="Select date of birth"
                size="large"
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                disabledDate={(current) => current && current > dayjs().endOf('day')}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Gender"
          required
          validateStatus={errors.sex ? 'error' : ''}
          help={errors.sex?.message}
        >
          <Controller
            name="sex"
            control={control}
            rules={{ required: 'Gender is required' }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select gender"
                size="large"
                options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' },  { label: 'Other', value: 'other' }]}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              {mode === 'edit' ? 'Save Changes' : 'Create User'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

