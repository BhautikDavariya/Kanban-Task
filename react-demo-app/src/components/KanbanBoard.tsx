import React, { useEffect, useState } from 'react'
import { Status, Task } from '../helper/types'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteTasks, fetchTasks, updateTasks } from '../API/api';
import { Button, Spin } from 'antd';
import TaskForm from './TaskForm';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import TaskCard from './TaskCard';


const statusColumns: { key: Status; label: string; id: number }[] = [
    { key: 'todo', label: 'To Dd', id: 1},
    { key: 'in-progress', label: 'In Progress', id: 2 },
    { key: 'done', label: 'Done', id: 3 },
]

const KanbanBoard = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { tasks } = useSelector((state: any) => state.tasks)

    const [showForm, setShowForm] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    useEffect(() => {
        dispatch(fetchTasks())
        setLoading(false)
    }, [])

    console.log('tasks', tasks)

    const handleDelete = (id: string) => {
        dispatch(deleteTasks(id))
    }

    const handleDreg = async (data: DropResult) => {
        if(!data.destination) return
        const taskId = data.draggableId;
        const newStatus = statusColumns.find((ietm: any) => data.destination?.droppableId.includes(ietm.key))
        await dispatch(updateTasks({id: taskId, data: {
            status: newStatus?.key
        }}))
    }
    return (
        <div className='max-w-6xl mx-auto p-4'>
            <h1 className='text-3xl mb-4 text-center'>KanbanBoard</h1>

            {showForm ? <TaskForm updateData={editingTask} setShowForm={setShowForm} /> : <>
                <div className='flex justify-center mb-4'>
                    <Button type='primary' onClick={() => {
                        setEditingTask(null)
                        setShowForm(true)
                    }}>Add Task</Button>
                </div>



                {loading ? <Spin size='large' className='flex justify-center' /> :
                    <DragDropContext onDragEnd={handleDreg}>
                        <div className='flex gap-4'>
                            {statusColumns.map((data, indexNum) => (
                                <Droppable droppableId={`${data.key}/${Math.random()}`} key={data.key}  >
                                    {(provided) => (
                                        <div {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className='flex-1 bg-gray-100 rounded p-3 min-h-screen'
                                        >
                                            <h2 className='text-xl font-semibold mb-2'>{data.label}</h2>
                                            {tasks.filter((t: any) => t.status === data.key).sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((task: any, index: any) => (
                                                <Draggable
                                                    draggableId={task?.id}
                                                    index={index}
                                                    key={task?.id}
                                                >
                                                    {(provided) => (
                                                        <div ref={provided.innerRef}
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}
                                                        >
                                                            <TaskCard
                                                                task={task}
                                                                onEdit={() => {
                                                                    setEditingTask(task)
                                                                    setShowForm(true)
                                                                }}
                                                                onDelete={() => handleDelete(task.id)}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </div>
                    </DragDropContext>
                }
            </>}


        </div>
    )
}

export default KanbanBoard