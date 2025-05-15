import { ChangeEvent, useEffect, useState } from "react";
import { Trash, Pencil } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';



export default function Todos() {

    const [todos, setTodos] = useState<any[]>([]);
    const [todoInput, setTodoInput] = useState<string>('');
    const navigate = useNavigate();



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
                    if (response.status === 401) {
                        alert("Session expired, please log in again");
                        navigate('/login');
                    }
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
                    if (response.status === 401) {
                        alert("Session expired, please log in again");
                        navigate('/login');
                    }
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
                    if (response.status === 401) {
                        alert("Session expired, please log in again");
                        navigate('/login');
                    }
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

    function deleteTodo(e: ChangeEvent<HTMLInputElement>, id: number) {
        fetch(`http://localhost:9001/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    console.error("Error deleting todo");
                    if (response.status === 401) {
                        alert("Session expired, please log in again");
                        navigate('/login');
                    }
                    return;
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function updateTodo(e: ChangeEvent<HTMLInputElement>, id: number) {
        const content = prompt("Update todo", todos.find(todo => todo.id === id)?.content);
        if (content) {
            fetch(`http://localhost:9001/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({ content }),
            })
                .then(response => {
                    if (!response.ok) {
                        console.error("Error updating todo");
                        if (response.status === 401) {
                            alert("Session expired, please log in again");
                            navigate('/login');
                        }
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setTodos(todos.map(todo => todo.id === id ? { ...todo, content } : todo));
                })
                .catch(error => {
                    console.error('Error:', error);
                    window.location.href = '/login';
                });
        }
    }

    function logout() {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="min-h-screen bg-white-gray">
            <div className="flex flex-col items-start max-w-md max-auto">
                <div className="flex flex-row items-baseline">
                    <h1 className="">GTodos</h1>
                    <h2 className="text-3xl">todo list v0.1</h2>

                </div> 
            </div>
            
            <div className="flex flex-content-start flex-col pb-30 bg-white-gray">
                {todos.map((todo, index) => (
                    <div key={index} className="p-4 m-2 rounded flex items-center">
                        
                        <div>
                            <input onChange={(e) => done(e, todo.id)} type="checkbox" checked={todo.finished_at?true:false} />
                        </div>
                        <div className="pl-4">
                            {todo.content}
                        </div>
                        <div className="ml-auto">
                            <button onClick={() => deleteTodo(event as any, todo.id)} className="bg-violet text-white flex justify-center items-center ml-5 !p-1"><Trash className="w-5 h-5"/></button>
                        </div>
                        <div className="ml-1em">
                            <button onClick={(e) => updateTodo(e as any, todo.id)} className="bg-violet text-white flex justify-center items-center ml-5 !p-1"><Pencil className="w-5 h-5"></Pencil></button>
                        </div>

                        {/*<p>{todo.finished_at}</p>*/}
                    </div>
                ))}
            </div>

            
            <div className="w-[calc(100vw-0vw)] bg-white-gray fixed bottom-0 left-0 p-5 drop-shadow-xl/50 flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                    <button onClick={createTodo} className="bg-violet text-white">Make new todo</button>
                    <input className="border-violet border-2 rounded-xl p-1 pl-2" onKeyDown={(e) => {if (e.key === "Enter")createTodo();}} onChange={e => setTodoInput(e.target.value)} value={todoInput} type="text" placeholder="write your todo"/>
                </div>
                <div>
                    <button onClick={logout} className="bg-violet text-white">Log out</button>
                </div>
            </div>
            
        </div>

        
    )
}