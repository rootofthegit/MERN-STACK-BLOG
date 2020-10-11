import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userName, setUserName] = useState(null)

    const login = useCallback((jwtToken, id, name, likedPosts) => {
        setToken(jwtToken)
        setUserName(name)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userName: name
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserName(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userName)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userName, ready}
}