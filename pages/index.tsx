import React, { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Home from '../components/home'

const IndexPage = () => {
    useEffect(() => {
        const getUser = async () => {
            const data = await supabase.auth.user()
            console.log(data)
        }
        getUser()
    }, [])
    return <Home />
}

export default IndexPage
