import React, { useRef, useState, useContext, Fragment } from 'react';
import { ProdcutContext } from '../Context/ProductContext.tsx';
import { useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';

type productType = { title: string, price: number, id: number };

const UseContextHooks = () => {
    const { products, deleteProduct, addProduct, updateProduct } = useContext(ProdcutContext);
    const [open, setOpen] = useState<boolean>(false);
    const [newProduct, setNewProduct] = useState<productType>({ title: "", price: null, id: 0 });
    const initialcall = useRef()
    const [update, setUpdate] = useState<productType>({ title: "", price: 0, id: 0 })

    const handleAdd = () => {

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


    const handleUpdate = () => {
        updateProduct(update)
        setUpdate({ id: '' })
    }

    return (
        <div className="flex flex-col">
            <table className="table-auto w-[500px] border-2 rounded-md shadow-sm">
                <thead>
                    <tr className="bg-slate-300">
                        <th className="px-4 py-2 border-b">Product</th>
                        <th className="px-4 py-2 border-b">Price</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <Fragment key={item.id}>
                            <tr className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b border-r">{item.title}</td>
                                <td className="px-4 py-2 border-b border-r">{item.price}</td>
                                <td className="px-4 py-2 border-b flex flex-row items-center">
                                    <button onClick={() => setUpdate(item)} className="text-blue-500 text-[25px]">
                                        <CiEdit />
                                    </button>
                                    <button onClick={() => deleteProduct(item.id)} className="text-red-500 text-[25px] ml-2">
                                        <MdDeleteOutline />
                                    </button>
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>

            <button ref={initialcall} onClick={() => setOpen(!open)} className="bg-blue-800 text-white p-2 rounded-md my-5">
                Add
            </button>

            <div
                className={`${open ? 'flex items-center justify-center' : 'hidden'
                    } absolute h-full w-full todos top-0 right-0 rounded-lg`}
            >
                <div className="w-[350px] bg-slate-100 flex flex-col p-5 justify-center gap-6 rounded-lg">
                    <h2 className="font-bold">Add to Product</h2>
                    <div className="flex flex-col items-center w-full shadow-md gap-3 shadow-red-100 p-3 rounded-md m-2">
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
                            <button className="h-10" onClick={handleAdd}>
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${update.id ? 'flex items-center justify-center' : 'hidden'
                    } absolute h-full w-full todos top-0 right-0 rounded-lg`}
            >
                <div className="w-[350px] bg-slate-100 flex flex-col p-5 justify-center gap-6 rounded-lg">
                    <h2 className="font-bold">update Product</h2>
                    <div className="flex flex-col items-center w-full shadow-md gap-3 shadow-red-100 p-3 rounded-md m-2">
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
                            <button className="h-10" onClick={handleUpdate}>
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UseContextHooks;
