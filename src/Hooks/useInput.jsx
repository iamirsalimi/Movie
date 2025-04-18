import React , {useState} from 'react'

export default function UseInput(init = "") {
    let [input , setInput] = useState(init)

    const resetValue = () => setInput('')

    let binding = {
        value:input.trim(),
        onChange: e => setInput(e.target.value)
    }

    return [input , binding , resetValue]
}
