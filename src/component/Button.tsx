import React from 'react'

const Button = ({ title, onClick, className }: { title: string, onClick: React.events, className?: string }) => {
    return (
        <button onClick={onClick} className={`${className}  p-3 text-white bg-blue-900 hover:bg-blue-950 hover:text-green-200 hover:shadow-2xl duration-700    font-bold rounded-md`}>{title}</button>
    )
}

export default Button