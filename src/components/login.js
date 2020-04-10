import React from 'react';

import HeaderLogin from '../components/header_login'
import Header from '../components/header'

const Login = () => {
    if (localStorage.getItem('userLogin') === 'true') {
        return <HeaderLogin/>
    }
    else {
        return <Header/>
    }
}

export default Login;