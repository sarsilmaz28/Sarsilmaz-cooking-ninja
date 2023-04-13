import { useEffect, useState } from "react";

export const useFetch=(url,method="GET")=>{  //GET passed as default
    const [data,setData]=useState(null);
    const [loading, setLoading]=useState(false);
    const [error,setError]=useState(null);

    const [options,setOptions]=useState(null);

    const postData=(postData)=>{
        setOptions({
            method: "POSt",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    }

    useEffect(()=>{
        const fetchUrl=async (fetchOptions)=>{
            setLoading(true);
            try {
                const response=await fetch(url,{...fetchOptions});
                if(!response.ok)
                {
                    throw new Error('Could not load data')
                }

                const json=await response.json();
                setLoading(false);
                setData(json);
                setError(null);
            }
            catch(err)
            {
                setLoading(false);
                setError('Error Loading the data');
            }
        }

        if(method==="GET"){
            fetchUrl()
        }

        if(method==="POST" && options){
            fetchUrl(options)
        }

    },[url,method,options])

    return {data:data, loading:loading, error:error, postData};   //first data is the name with which the value returned from the hook can be accessed
                //second data is the useState Data
}

