import { ChangeEvent, useEffect, useState } from "react";


export default function Todos() {

    const [todos, setTodos] = useState<any[]>([]);
    const [todoInput, setTodoInput] = useState<string>('');


    function createTodo() {
        fetch('http://localhost:9001/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({ content: todoInput}),
        })
            .then(response => {
                if (!response.ok) {
                    console.error("Error creating todo");
                    return;
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTodos([...todos, data]);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function getTodos() {
        fetch('http://localhost:9001/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            }})
            .then(response => {
                if (!response.ok) {
                    console.error("Error getting todos");
                    return;
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTodos(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function done(e: ChangeEvent<HTMLInputElement>, id: number) {
        const checked = e.target.checked;
        const action = checked ? 'done' : 'undone';
        //const finished_at = checked ? new Date().toISOString() : null;
        fetch(`http://localhost:9001/todos/${id}/${action}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    console.error("Error updating todo");
                    return;
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTodos(todos.map(todo => todo.id === id ? { ...todo, finished_at: checked } : todo));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div>
            <div className="flex flex-row items-baseline">
                <h1 className="">GTodos</h1>
                <h2 className="text-3xl">todo list 0.1</h2>

            </div>
            
            <div>
                {todos.map((todo, index) => (
                    <div key={index} className="bg-red-500 p-4 m-2 rounded">
                        <h2><input onChange={(e) => done(e, todo.id)} type="checkbox" checked={todo.finished_at?true:false} />{todo.content}</h2>
                        {/*<p>{todo.finished_at}</p>*/}
                    </div>
                ))}
            </div>

            <input onChange={e => setTodoInput(e.target.value)} value={todoInput} type="text" placeholder="write your todo"/>
            <button onClick={createTodo} className="bg-violet text-white">Make new todo</button>
        </div>

        
    )
}