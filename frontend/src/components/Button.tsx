import React from 'react'

export const Button: React.FC<{ title: string ,onclick?:()=>void}> = ({ title ,onclick}) => {
    return (
        <button
            onClick={onclick}
            className="inline-flex items-center justify-center rounded-md bg-[#c5ec78] py-2 px-2 text-center font-medium text-xs md:text-base text-black hover:bg-opacity-90 md:px-8 md:py-2"
        >
            {title}
        </button>
    
)}


export const Button2: React.FC<{ title: string,onClick:()=> void} > = ({ title,onClick }) => {
    return (
        <button
        
        onClick={onClick}
            className="inline-flex items-center justify-center rounded-md bg-neutral-800 font-thin py-2 px-2 text-center font-medium text-xs md:text-base text-[#c5ec78] hover:bg-opacity-90 lg:px-8 xl:px-8"
        >
            {title}
        </button>
    )
}

export const Button3: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div
        className="inline-flex items-center justify-center rounded-md border border-[#c5ec78] py-2 px-2 text-center  text-[#c5ec78] text-xs md:text-base hover:bg-opacity-90 lg:px-8 xl:px-8 font-thin"
        >
            {title}
        </div>
    )
}
// export default Button2