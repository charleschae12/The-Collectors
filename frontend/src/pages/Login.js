import React from 'react';
import '../App.css'
import Bgimg from './BG.png';
import styled from 'styled-components';
import Home from './Home';

function Login(){
    return(
        <div style={{
            backgroundImage: `url(${Bgimg})`,
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh',
            textAlign: 'center',
        }}>
            <div className="App justify-content-center align-items-center mx-auto" style={{backgroundColor: 'white', width: '500px', justifyContent: 'center', alignItems: 'center'}}>
                Nothing here
            </div>
        </div>
    );
}

export default Login;
