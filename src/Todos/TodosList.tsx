import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { IoMdDoneAll } from 'react-icons/io';
import { IoAlarmOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';

type Todo = { id: number; text: string; done: boolean };

interface TodosListProps {
    todos: Todo[];
    handleChangeTask: (id: number) => void;
    handleDeleteTask: (id: number) => void;
    handleUpdate: (updatedTodo: Todo) => void;
    update: Todo | null;
    setUpdate: React.Dispatch<React.SetStateAction<Todo | null>>;
}

const TodosList: React.FC<TodosListProps> = ({
    todos,
    handleChangeTask,
    handleDeleteTask,
    handleUpdate,
    update,
    setUpdate,
}) => {

    return (
        <div className="w-full mt-4">
            {todos.length === 0 ? (
                <p className='flex items-center justify-center h-full w-full mt-16'>No tasks yet!</p>
            ) : (
                todos.map((todo: Todo, index: number) => (
                    <div key={todo.id}>
                        <div className="flex justify-between w-full min-h-9 items-center p-2"
                        >
                            <label className="flex gap-2">
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => handleChangeTask(todo.id)}
                                />
                                {update?.id !== todo.id ? (<div className="flex flex-col">
                                    <span className={todo.done && 'line-through'}>{todo.text}</span>
                                    <span className="flex flex-row items-center gap-2 text-slate-500"><IoAlarmOutline />{new Date(todo.id).toLocaleString().slice(9, 15)}</span>
                                </div>
                                ) : (
                                    <input className="focus:outline-none border-2 px-2 rounded-sm border-slate-300"
                                        placeholder="Update task"
                                        value={update?.text || ''}
                                        onChange={(e) =>
                                            setUpdate((prev: Todo) => (prev ? { ...prev, text: e.target.value } : prev))
                                        }
                                    />
                                )}
                            </label>
                            <div className="flex gap-2">
                                {/* <span className={` w-3 h-3 rounded-full ${index % 2 === 0 && index % 3 === 0 ? "bg-pink-500" : index % 2 === 0 ? "bg-green-400" : "bg-blue-400"}`}></span> */}
                                {update?.id !== todo.id ? (
                                    todo.done ?
                                        <IoMdDoneAll color='green' size={20} /> :
                                        <button
                                            type="button"
                                            onClick={() => setUpdate(todo)}
                                            className="text-blue-500 text-[22px]"
                                        >
                                            <CiEdit />
                                        </button>

                                ) : (
                                    <button onClick={handleUpdate} className="ml-2 text-green-500">
                                        Save
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteTask(todo.id)}
                                    className="text-red-500 text-[22px]"
                                >
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </div>
                        <div className="w-full border-b-2 border-slate-400"></div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TodosList;
