import React from 'react'

const Input:React.FC<{ value:string|number,label: string,placeholder: string,description?: string,type:string,onchange:(e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label,value,placeholder,type,description,onchange}) => {
    return (
        <div className='my-2 md:my-4'>
            <label className=" block dark:text-white font-thin text-sm md:text-base">
                {label}
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onchange}
                className="w-full text-xs md:text-base rounded-md border-[1px] my-[0.2em] border-neutral-600 bg-neutral-800 py-3 px-2 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default "
            />
            {description&&<p className='text-xs md:text-sm text-neutral-500'>{description}</p>}
        </div>
    )
}

export default Input