import { Button, Card } from 'antd'
import React from 'react'
import { Task } from '../helper/types'

interface propsTypes {
    task: Task;
    onEdit: () => void;
    onDelete: () => void
}

const TaskCard = (props:propsTypes ) => {
    const {task, onEdit, onDelete} = props
  return (
    <Card className='mb-6' title={task.title} extra={
        <>
        <Button type='link' size='small' onClick={onEdit}>Edit</Button>
        <Button type='link' size='small' danger onClick={onDelete}>Delete</Button>
        </>
    }>
        {task.description}
    </Card>
  )
}

export default TaskCard