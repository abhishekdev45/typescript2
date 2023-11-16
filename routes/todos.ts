import { Router } from 'express';
import {Todo} from '../models/todo';

const todos: Todo[] = [];

const router = Router();


router.get('/' , (req,res,next) => {
    res.status(200).json({todos:todos});
})

router.post('/todo' ,(req,res,next)=>{
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    };

    todos.push(newTodo);
    res.status(200).json({ message: 'Todo added successfully' });
});

router.post('/delete' , (req,res,next) => {
    const id: string = req.body.id;
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todos.splice(index, 1);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
})

router.post('/edit', (req, res, next) => {
    const id: string = req.body.id;
    const newText: string = req.body.newText;

    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        todo.text = newText;
        res.status(200).json({ message: 'Todo edited successfully', todo: todo });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});


export default router;