import { useRouter} from "next/navigation";
import { useEffect } from "react";
import { clearInterval } from "timers";

export function usePolling(ms:number=6000,searchParam:string |null){
    const router =useRouter()


    useEffect(()=>{
        const intervalId=setInterval(()=>{
            console.log('interval running...')
            if(!searchParam){
                console.log('refreshing data')
                router.refresh()
            }
        },ms)

        return ()=>clearInterval(intervalId)
    },[searchParam,ms])//eslint-disable-line react-hooks/exhaustive-deps

}