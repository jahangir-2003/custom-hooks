import React, { createContext, useState } from 'react'
export const ThemeContext = createContext()

export const ThemeProvider = ({ children }: { children: any }) => {
    const [theme, setTheme] = useState<string>("light")
    const ChangeTheme = () => {
        setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'));
    }
    return (
        <ThemeContext.Provider value={{ theme, ChangeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}