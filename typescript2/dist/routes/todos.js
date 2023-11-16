"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(200).json({ message: 'Todo added successfully' });
});
router.delete('/todo/:id', (req, res, next) => {
    const params = req.params;
    const id = params.id;
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }
});
router.put('/edit/:id', (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const id = params.id;
    const newText = body.text;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.text = newText;
        res.status(200).json({ message: 'Todo edited successfully', todo: todo });
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }
});
exports.default = router;
