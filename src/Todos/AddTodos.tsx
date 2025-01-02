import React from 'react'

const AddTodos = ({ open, setOpen, handleAddTask, newTodo, setNewTodo }) => {
    return (
        <div className="h-[200px] w-[90%] bg-slate-100 flex flex-col p-5 justify-center gap-6 rounded-lg">
            <h2 className="font-bold">Add to list</h2>
            <input
                placeholder="Enter todos "
                className="bg-transparent outline-none border-2 p-2 rounded-lg border-blue-800"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <div className="flex flex-row justify-between text-blue-800 font-normal">
                <button
                    className="h-10"
                    onClick={() => setOpen(!open)}
                >Cancel</button>
                <button className="h-10" onClick={handleAddTask} >Done</button>
            </div>
        </div>
    )
}

export default AddTodos