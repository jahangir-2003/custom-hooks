
import React, { useState } from 'react'
import Button from './component/Button.tsx'
import useFetchData from './component/MyHooks.tsx'
import Rating from './component/Rating.tsx'
import Hook from './Hooks/Hook.tsx'
import Todos from './Todos/Todos.tsx'
import Counter from './Counter/Counter.tsx'

const App: React.FC = () => {
  const [show, setShow] = useState<string>("")
  const [data] = useFetchData('https://fakestoreapi.com/products')

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





  const renderContent = () => {
    if (show === "") return <Counter />
    if (show === "todos") return <Todos />;
    if (show === "custom-hook") return customHooks();
    if (show === "hooks") return <Hook />;

  }

  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-center my-4">
        <button onClick={() => setShow("")} className="text-[17px] md:text-2xl capitalize underline underline-offset-4">Counter</button>
        <button onClick={() => setShow("custom-hook")} className="text-[17px] md:text-2xl capitalize underline underline-offset-4">fetch data</button>
        <button onClick={() => setShow("todos")} className="text-[17px] md:text-2xl capitalize underline underline-offset-4">Todos</button>
        <button onClick={() => setShow("hooks")} className="text-[17px] md:text-2xl capitalize underline underline-offset-4">Hooks</button>
      </div>

      <div className="flex flex-col items-center">
        {renderContent()}
      </div>
    </>
  )
}

export default App
