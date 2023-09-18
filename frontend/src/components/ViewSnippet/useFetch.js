import {useState, useEffect} from 'react'

const useFetch = (url) => {
const[data,setData] = useState(null);
const [isPending, setIsPending] = useState(true);
const [error, setError] = useState(null);
const [called, setCalled] = useState(false);

    useEffect(() => {
        if (!called) {
            setCalled(true);
            fetch(url)
            .then(res => {
                console.log(res)
                if (!res.ok){
                    throw Error ('Could not fetch the data for that resource ☹');
                }
                return res.json(); 
            })
            .then(data => {
                setData(data);
                setError(null);
                setIsPending(false);
            })
            .catch((err => {
                setError(err.message);
                setIsPending(false);
            }))
        }
    },[called]);

    return {data, isPending, error}
}

export default useFetch;