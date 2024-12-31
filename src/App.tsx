
import React, { useState, useContext } from 'react'
import Button from './component/Button.tsx'
import CustomHooks from './component/CustomHooks.tsx'
import useFetchData from './component/MyHooks.tsx'
import Rating from './component/Rating.tsx'
import { ThemeContext } from './Context/ThemeContext.tsx'
import Hook from './component/Hook.tsx'

const App: React.FC = () => {
  const [count, setCount] = CustomHooks()
  const { theme, ChangeTheme } = useContext(ThemeContext)
  const [show, setShow] = useState<string>("")
  const [data] = useFetchData('https://fakestoreapi.com/products')
  const [todo, setTodos] = useState<{ text: string, id: number, completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false)
  console.log(theme)
  const customHooks = () => {
    return (
      <div className="flex items-center justify-center my-5 flex-col">
        <h2 className="text-2xl capitalize font-serif my-4 underline underline-offset-4">Fetch and Render Data using custom hooks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-between w-full md:w-[95%] lg-[85%]">
          {data?.map((item) => (
            <div key={item.id} className="w-[300px] border-2 shadow-md rounded-md mx-auto">
              <img src={item.image} alt={item.title} className='h-[200px] mx-auto p-3 object-contain' />
              <div className="p-2 flex flex-col gap-2">
                <h1 className="font-bold title">{item?.title}</h1>
                <h2 className="font-bold ">$ {item?.price}</h2>
                <p className="text-[15px] description">{item?.description.slice(0, 200)}{item?.description.length > 200 ? '...' : ''}</p>
                <Rating Rating={item?.rating?.rate} RatingCount={item?.rating?.count} />
                <Button title={"Add To Cart"} onClick={() => { }} className="p-2 text-white rounded-md my-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const counter = () => {
    return (
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-2xl capitalize font-semibold">Counter using Custom Hooks</h2>
        <div className="flex flex-col items-center justify-center gap-2 mt-6">
          <Button title="Increase" onClick={() => setCount(count + 1)} />
          <h2 className="text-2xl">{count}</h2>
          <Button title="Decrease" onClick={() => setCount(count - 1)} />
        </div>
      </div>
    )
  }

  const todos = () => {

    const handleChange = () => { }
    const addTodos = () => { }
    const handleUpdate = () => { }
    const handledelete = () => { }

    return (
      <div className='w-[350px] h-screen border-2 relative border-purple-800 p-5 rounded-lg'>
        <div className="flex items-center mx-auto flex-row justify-between">
          <h2 className="text-2xl font-bold">Today</h2>
          <Button title='Add' onClick={() => setOpen(!open)} />
        </div>

        <div className="w-[90%] flex-col gap-10">
          {todos.length === 0 ? (
            <p>No tasks yet!</p>
          )
            : (
              todo.map((todo) => (
                <div key={todo.id}>
                  <div className="flex justify-between w-full h-9 items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                    />
                    <h2 className={todo.completed ? 'line-through' : ''}>{todo.text}</h2>
                    <button className="text-red-500">Delete</button>
                  </div>
                  <div className="w-full border-b border-black"></div>
                </div>
              ))
            )
          }
        </div>

        <div className={`${open ? 'modal-open' : 'hidden'} absolute bg-slate-200  h-full w-full top-0 right-0 rounded-lg`}>
          <div className="h-[300px] w-full bg-red-300 flex flex-col p-5 justify-center gap-6 rounded-lg">
            <h2>Add to list</h2>
            <input placeholder="enter todos " className="bg-transparent outline-none border-2 p-2 rounded-lg border-blue-800" />
            <div className="flex flex-row justify-between ">
              <Button className='h-10' title='cancel' onClick={() => setOpen(!open)} />
              <Button className='h-10' title='done' onClick={() => { }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (show === "todos") return todos();
    if (show === "custom-hook") return customHooks();
    if (show === "hooks") return <Hook />;
    return counter();
  }

  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-center my-4">
        <button onClick={() => setShow("")} className="text-2xl capitalize underline underline-offset-4">Counter</button>
        <button onClick={() => setShow("custom-hook")} className="text-2xl capitalize underline underline-offset-4">fetch data</button>
        <button onClick={() => setShow("todos")} className="text-2xl capitalize underline underline-offset-4">Todos</button>
        <button onClick={() => setShow("hooks")} className="text-2xl capitalize underline underline-offset-4">Hooks</button>
      </div>

      <div className="flex flex-col items-center">
        {renderContent()}
      </div>
    </>
  )
}

export default App
