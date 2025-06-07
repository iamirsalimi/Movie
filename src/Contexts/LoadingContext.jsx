import { createContext } from "react";

let LoadingContext = createContext({
    loading : null,
    setLoading : () => false
})

export default LoadingContext