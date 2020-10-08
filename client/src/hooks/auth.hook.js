import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [likedPosts, setLikedPosts] = useState(null)

    const login = useCallback((jwtToken, id, name, likedPosts, comments) => {
        setToken(jwtToken)
        setUserId(id)
        setUserName(name)
        setLikedPosts(likedPosts)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userName: name, likedPosts: likedPosts
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserName(null)
        setLikedPosts(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.userName, data.likedPosts)
        }
        setReady(true)
    })

    return {login, logout, token, userId, userName, likedPosts, ready}
}