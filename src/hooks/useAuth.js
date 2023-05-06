import {useState} from 'react'

export default useAuth = () => {
    const [user, setUser] = useState({
        userId: null,
        catName: null,
        wallet: 0,
        catAge: 0
    })


    return user
}