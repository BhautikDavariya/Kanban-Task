import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";


export interface Task {
    id: string;
 title: string;
 description?: string;
 status: 'todo' | 'in-progress' | 'done';
 createdAt: Date;
}


let tasks: Task[] = [];


export const getTasks = (req: Request, res: Response) => {
    res.json(tasks)
}

export const createTask  = (req: Request, res: Response) => {
    const {title, description, status} = req.body;
    if(!title){
        return res.status(400).json({message: 'title is requied!'})
    }

    const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        status: status || 'in-progress',
        createdAt: new Date()
    }

    tasks.push(newTask)
    res.status(200).json(newTask)
}

export const updateTask = (req: Request, res: Response) => {
    const {id} = req.params;
     const {title, description, status} = req.body;

     const taskIndex = tasks.findIndex((task) => task.id === id);
     if(taskIndex === -1){
        return res.status(404).json({message: "Task not found"});
     }

     tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title !== undefined ? title : tasks[taskIndex].title,
        description: description !== undefined ? description : tasks[taskIndex].description,
        status: status !== undefined ? status : tasks[taskIndex].status,
     }

     res.status(200).json(tasks[taskIndex])
}


export const deleteTask = (req: Request, res: Response) => {
    const {id} = req.params;
    tasks = tasks.filter((task) => task.id !== id)
    res.status(200).json({message: "Task Delete Done!"});
}