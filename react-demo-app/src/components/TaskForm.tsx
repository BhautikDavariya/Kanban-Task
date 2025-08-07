import { Button, Card, Input } from 'antd';
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'
import { createTasks, updateTasks } from '../API/api';


const validationSchema = Yup.object({
    title: Yup.string().required('Title is requied')
})

const TaskForm = ({ updateData, setShowForm }: any) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (value: any) => {
            if (value?.id) {
                 const res: any = await dispatch(updateTasks({id: value.id, data: value}))
                if (res) {
                    setShowForm(false)
                }
            } else {
                const res: any = await dispatch(createTasks(value))
                if (res) {
                    setShowForm(false)
                }
            }
        }
    })


    useEffect(() => {
        if (updateData) {
            formik.setValues(updateData)
        }
    }, [updateData])

    return (
        <div className='w-full h-[80vh] flex justify-center align-middle items-center bg-gray-300'>
            <div className='w-[50%] m-auto'>
                <Card className='shadow'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-3'>
                            <label>Title</label>
                            <Input
                                name='title'
                                id='title'
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='Enter task title'
                            />
                            {formik?.touched.title && formik?.errors?.title ? <div className='text-red-500'>
                                {formik?.errors?.title}
                            </div> : null}
                        </div>

                        <div className='mb-3'>
                            <label>Description</label>
                            <Input.TextArea
                                name='description'
                                id='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='Enter task description'
                            />
                            {formik?.touched?.description && formik?.errors?.description ? <div className='text-red-500'>
                                {formik?.errors?.description}
                            </div> : null}
                        </div>

                        <div>
                            <Button type='primary' className='me-4' htmlType='submit'>
                                Save
                            </Button>
                            <Button htmlType='button' onClick={() => setShowForm(false)} >
                                Back
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default TaskForm