import { Router } from 'express';
import {Todo} from '../models/todo';

const todos: Todo[] = [];

const router = Router();

type RequestBody = {text:string};
type RequextParams = { id : string };


router.get('/' , (req,res,next) => {
    res.status(200).json({todos:todos});
})

router.post('/todo' ,(req,res,next)=>{
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text,
    };

    todos.push(newTodo);
    res.status(200).json({ message: 'Todo added successfully' });
});

router.delete('/todo/:id' , (req,res,next) => {
    const params = req.params as RequextParams;

    const id: string = params.id;

    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todos.splice(index, 1);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
})

router.put('/edit/:id', (req, res, next) => {

    const params = req.params as RequextParams;
    const body = req.body as RequestBody;

    const id: string = params.id;
    const newText: string = body.text;

    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        todo.text = newText;
        res.status(200).json({ message: 'Todo edited successfully', todo: todo });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});


export default router;