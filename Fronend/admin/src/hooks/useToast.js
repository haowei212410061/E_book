import { toast } from "react-toastify"

export function useToast(){
    const success = (message)=>{
        return toast.success(message)
    }
    const warning = (message)=>{
        return toast.warning(message)
    }
    const error = (message)=>{
        return toast.error(message)
    }
    return {success,warning,error}
}