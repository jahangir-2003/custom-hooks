import React, { useState, useReducer } from "react";
import TodosList from "./TodosList.tsx";
import AddTodos from "./AddTodos.tsx";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

type todos = { text: string; id: number; done: boolean };

type Action =
    | { type: 'added'; text: string, id: number }
    | { type: 'changed'; id: number, text: any }
    | { type: 'deleted'; id: number }
    | { type: 'updated'; task: todos };

const tasksReducer = (state: todos[], action: Action) => {
    switch (action.type) {
        case "added": {
            return [{
                id: action.id,
                text: action.text,
                done: false
            }, ...state]
        }
        case "changed": {
            return state.map((item) => item.id === action.id ? { ...item, done: !item.done } : item)
        }
        case "updated": {
            return state.map((item) => item.id === action.task.id ? { ...item, text: action.task.text.trim() } : item)
        }
        case "deleted": {
            return state.filter((item) => item.id != action.id)
        }
    }
};

const Todos = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [open, setOpen] = useState<boolean>(false);
    const [newTodo, setNewTodo] = useState<string>("");
    const [update, setUpdate] = useState<todos>({ id: null, text: "", done: false })
    const [searchtext, setSearchText] = useState<string>("")

    const handleAddTask = () => {
        if (newTodo.trim()) {
            dispatch({
                type: "added",
                id: new Date().getTime(),
                text: newTodo.trim(),
            });
            setNewTodo("");
            setOpen(!open)
        }
    }

    const handleChangeTask = (id: number) => {
        dispatch({
            type: "changed",
            id: id,
        });
    }

    const handleDeleteTask = (taskId) => {
        dispatch({
            type: "deleted",
            id: taskId,
        });
    }
    const handleUpdate = () => {
        dispatch({ type: "updated", task: update })
        setUpdate({ id: null, text: "", done: false })
    }


    let filtered;
    if (searchtext.trim().length > 0) {
        filtered = tasks.filter((item) => item.text.toLowerCase().includes(searchtext.trim().toLowerCase()))
    }
    else {
        filtered = tasks
    }

    return (
        <div className="w-[310px] sm:w-[350px] h-[100vh-100px] border-2 relative border-purple-800 p-5 rounded-lg">
            <div className="flex items-center mx-auto flex-row justify-between w-full gap-1">
                <h2 className="text-2xl font-sans">Today</h2>
                <div className="flex flex-row items-center border-2 p-1 mx-2 rounded-md border-slate-200 shadow-sm group ">
                    <span className="w-8 h-full items-center justify-center text-slate-400 ">
                        <FaSearch />
                    </span>
                    <input className="w-full focus:outline-none" type="text" placeholder="search here" value={searchtext} onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <button onClick={() => setOpen(!open)}><IoAddCircleOutline size={30} color="blue" /></button>
            </div>
            <div className="w-full h-[75vh] flex-col  gap-10 overflow-y-auto no-scrollbar">
                <TodosList todos={filtered} handleDeleteTask={handleDeleteTask} handleChangeTask={handleChangeTask} handleUpdate={handleUpdate} update={update} setUpdate={setUpdate} />
            </div>
            <div
                className={`${open ? "flex items-center justify-center" : "hidden"
                    } absolute   h-full w-full todos top-0 right-0 rounded-lg`}
            >
                <AddTodos open={open} setOpen={setOpen} handleAddTask={handleAddTask} newTodo={newTodo} setNewTodo={setNewTodo} />
            </div>
        </div>
    );
};

export default Todos;
