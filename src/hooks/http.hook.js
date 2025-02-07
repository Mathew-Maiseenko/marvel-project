import { useState, useCallback } from "react";

const useHttp = () => {
    let [error, setError] = useState(false)
    let [loading, setLoading] = useState(true);

    const setRequest = useCallback( async (url, method = 'GET', body = null, 
    headers = {"Content-Type" : "application/json"}) => {
        setLoading(true);
        console.log("...feaching");

        try {
            let response = await fetch(url, {method, body, headers})

            if (!(response.ok) ) {
                //console.error(`Problem with feacting on ${url}, status: ${response.status}`)
                throw new Error(`Problem with feacting on ${url}, status: ${response.status}`)
            }

            const data = response.json()
            setLoading(false);

            return data
        } catch(er) {
            setError(true);
            setLoading(false);
            throw er
        }
    }, [])

    const clearError = useCallback(() => {
        setError(false);
    }, [])

    return {loading, setRequest, error, clearError, setLoading}
}

export default useHttp