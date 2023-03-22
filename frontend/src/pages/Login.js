import React from 'react';
import '../App.css'
import Bgimg from './BG.png';
import styled from 'styled-components';

function Login(){
    return(
        <div style={{
            backgroundImage: `url(${Bgimg})`,
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh',
            textAlign: 'center',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{backgroundColor: 'white', width: '500px', justifyContent: 'center', alignItems: 'center'}}>
                Nothing
            </div>
        </div>
    );
}

export default Login;
