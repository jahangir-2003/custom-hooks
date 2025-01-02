import React, { ReactNode, createContext, useState } from "react";
export const ProdcutContext = createContext<any>();
const initial = [
    { id: 1, title: "apple", price: 20 },
    { id: 2, title: "mango", price: 50 },
];
type datatype = { id: number; title: string; price: number };
export const ProdcutProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProduct] = useState<datatype[]>(initial);


    const addProduct = (product: datatype) => {
        // console.log(product);
        setProduct([product, ...products])
    };

    const deleteProduct = (id: number) => {
        console.log(id);
    };

    const updateProduct = (update: datatype) => {
        // console.log(update);
        setProduct(products.map((item) => item.id === update.id ? { ...item, text: update.title.trim(), price: update.price } : item))
    };
    return (
        <ProdcutContext.Provider
            value={{ products, deleteProduct, addProduct, updateProduct }}
        >
            {children}
        </ProdcutContext.Provider>
    );
};
