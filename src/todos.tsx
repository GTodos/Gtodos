import { ChangeEvent, useEffect, useState } from "react";
import { Trash, Pencil } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import ConfirmModal from "./modals/ConfirmModal";



export default function Todos() {

    const [todos, setTodos] = useState<any[]>([]);
    const [todoInput, setTodoInput] = useState<string>('');
    const navigate = useNavigate();


    type TodoAction = 'create' | 'get' | 'update' | 'done' | 'undone' | 'delete';

    function handleTodoAction(action: TodoAction, id?: number, content?: string) {

        let url = "http://localhost:9001/todos"
        let method = "GET"

        if (action == "update" || action == "done" || action == "undone" || action == "delete") {

            method = "PUT"
            url = url + `/${id}`

            if (action == "done" || action == "undone") {
                url = url + `/${action}`
            }

            if (action == "delete") {
                method = "DELETE"
            }
            

        }
        else if (action == "create") {
            method = "POST"
        } 


        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: content? JSON.stringify({content: content}): undefined

        })
            .then(response => {
                if (!response.ok) {
                    console.error("Error contacting backend");
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

                if (action == "get") {
                    setTodos(data);
                } else if (action == "create") {
                    setTodos([...todos, data])
                } else if (action == "update") {
                    setTodos(todos.map(todo => todo.id === id ? { ...todo, content } : todo));
                } else if (action == "done" || action == "undone") {
                    const checked = action == "done" ? true:false;
                    setTodos(todos.map(todo => todo.id === id ? { ...todo, finished_at: checked } : todo));
                } else if (action == "delete") {
                    setTodos(todos.filter(todo => todo.id !== id));
                }

            })


            .catch(error => {
                console.error('Error:', error);
            });

    }


    function createTodo() {
        handleTodoAction("create", undefined, todoInput)
    }

    function getTodos() {
        handleTodoAction("get")
    }

    function doneUndone(e: ChangeEvent<HTMLInputElement>, id: number) {
        const checked = e.target.checked;
        const action = checked ? 'done' : 'undone';
        handleTodoAction(action, id)
    }

    function deleteTodo(e: ChangeEvent<HTMLInputElement>, id: number) {
        handleTodoAction("delete", id)
    }

    function updateTodo(e: ChangeEvent<HTMLInputElement>, id: number) {
        const updatedText = prompt("Update todo", todos.find(todo => todo.id === id)?.content);
        if(updatedText) {
            handleTodoAction("update", id, updatedText)
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
                            <input onChange={(e) => doneUndone(e, todo.id)} type="checkbox" checked={todo.finished_at?true:false} />
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

            
                <ConfirmModal 
                    isOpen={false} 
                    onConfirm={function (): void {} } 
                    onCancel={function (): void {} } 
                    message={""}>
                </ConfirmModal>
            
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