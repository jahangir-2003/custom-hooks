import React from 'react'
import Button from '../component/Button.tsx'
import CustomHooks from '../component/CustomHooks.tsx'

const Counter = () => {
    const [count, setCount] = CustomHooks();
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

export default Counter