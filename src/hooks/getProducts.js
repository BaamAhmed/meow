import apicall from '../api/apicall'
import {useState} from 'react'

const getProducts = () => {
    const [foundProducts, setFoundProducts] = useState([])
    //a function that actually makes the async API call
    const findProducts = async () => {
        try {
            const foundItems = await apicall.get('/products')
            // console.log(foundItems.data)
            setFoundProducts(foundItems.data)
        } catch (err) {
            console.log('hello' + err)
        }
    }
    return [findProducts, foundProducts]
}

export default getProducts