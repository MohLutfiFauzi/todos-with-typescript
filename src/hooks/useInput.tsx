import React, { useState } from 'react'

const useInput = (initialValue : string) => {
    const [value, setValue] = useState<string>(initialValue)
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setValue(e.target.value)
    }

    return [ value, changeValue ] 
}

export default useInput