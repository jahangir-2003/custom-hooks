import React, { useRef, useState, useContext, Fragment } from 'react';
import { ProdcutContext } from '../Context/ProductContext.tsx';
import { useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';

type productType = { title: string, price: number, id: number };

const UseContextHooks = () => {
    const { products, deleteProduct, addProduct, updateProduct } = useContext(ProdcutContext);
    const [open, setOpen] = useState<boolean>(false);
    const [newProduct, setNewProduct] = useState<productType>({ title: "", price: 0, id: 0 });
    const initialcall = useRef()
    const [update, setUpdate] = useState<productType>({ title: "", price: 0, id: 0 })
    const [updateOpen, setUpdateOpen] = useState<boolean>(false)

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (newProduct.title.trim() === "" || newProduct.price <= 0) {
            console.log("All fields are required, and price must be greater than zero");
        } else {
            addProduct({
                id: new Date().getTime(),
                title: newProduct.title,
                price: newProduct.price,
            });
            setNewProduct({ title: "", price: 0, id: 0 });
            setOpen(false);
        }
    };


    useEffect(() => { initialcall.current.focus() }, [])


    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault()
        updateProduct(update)
        setUpdate({ id: '' })
    }

    return (
        <div className="flex flex-col">
            <ul className="flex flex-col w-[320px] border-2 shadow-sm">
                {products.map((item: productType) => (
                    <Fragment key={item.id}>
                        <li className="flex flex-row gap-1 px-3 py-1 justify-between items-center">
                            <div className="flex flex-row gap-2"><h2>{item.title}</h2>
                                <h2>{item.price}</h2>
                            </div>
                            <div className="flex flex-row gap-2">
                                <button onClick={() => setUpdate(item)}><CiEdit /></button>
                                <button onClick={() => deleteProduct(item.id)}><MdDeleteOutline /></button>
                            </div>
                        </li>
                        <div className="w-full border-b-2"></div>
                    </Fragment>
                ))}
            </ul>
            <button ref={initialcall} onClick={() => setOpen(!open)} className="bg-blue-800 text-white p-2 rounded-md my-5">
                Add
            </button>

            <div
                className={`${open ? 'flex items-center justify-center' : 'hidden'
                    } absolute h-full w-full todos top-0 right-0 rounded-lg`}
            >
                <div className="w-[350px] bg-slate-100 flex flex-col p-5 justify-center gap-6 rounded-lg">
                    <h2 className="font-bold">Add to Product</h2>
                    <form onSubmit={handleAdd} className="flex flex-col items-center w-full shadow-md gap-3 shadow-red-100 p-3 rounded-md m-2">
                        <input
                            placeholder="Enter product name"
                            className="bg-transparent w-full outline-none border-2 p-2 rounded-lg border-blue-800"
                            value={newProduct.title}
                            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Enter product price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                            className="bg-transparent w-full outline-none border-2 p-2 rounded-lg border-blue-800"
                        />
                        <div className="w-full flex flex-row justify-between text-blue-800 font-normal">
                            <button className="h-10" onClick={() => setOpen(false)}>
                                Cancel
                            </button>
                            <button className="h-10" type="submit">
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div
                className={`${update.id ? 'flex items-center justify-center' : 'hidden'
                    } absolute h-full w-full todos top-0 right-0 rounded-lg`}
            >
                <div className="w-[350px] bg-slate-100 flex flex-col p-5 justify-center gap-6 rounded-lg">
                    <h2 className="font-bold">update Product</h2>
                    <form onSubmit={handleUpdate} className="flex flex-col items-center w-full shadow-md gap-3 shadow-red-100 p-3 rounded-md m-2">
                        <input
                            placeholder="Enter product name"
                            className="bg-transparent w-full outline-none border-2 p-2 rounded-lg border-blue-800"
                            value={update.title}
                            onChange={(e) => setUpdate({ ...update, title: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Enter product price"
                            value={update.price}
                            onChange={(e) => setUpdate({ ...update, price: parseFloat(e.target.value) || 0 })}
                            className="bg-transparent w-full outline-none border-2 p-2 rounded-lg border-blue-800"
                        />
                        <div className="w-full flex flex-row justify-between text-blue-800 font-normal">
                            <button className="h-10" onClick={() => setUpdate({ id: null })}>
                                Cancel
                            </button>
                            <button className="h-10" type="submit">
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UseContextHooks;
