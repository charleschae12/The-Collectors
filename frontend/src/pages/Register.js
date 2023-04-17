import React from 'react';
import '../App.css'
import Bgimg from './BG.png';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from "react-router-dom";

function Register(){
  return(
    <div style={{
        backgroundImage: `url(${Bgimg})`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
    }}>
        <div className="App justify-content-center align-items-center mx-auto" style={{
            width: '500px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '140px 5px 5px 5px',
        }}>
            <div style={{
                display: 'flex',
                backgroundColor: '#202060',
                height: '80px',
                color: 'white',
                fontSize: '45px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
            }}>
                Register
            </div>
            <div style={{
                height: '200px',
                padding: '10px 0px 0px 0px',
            }}>
                <div style={{
                    display: 'flex',
                    backgroundColor: '#ffffff90',
                    height: '130px',
                    width: '100%',
                    borderRadius: '10px',
                    alignContent: 'right',
                    alignItems: 'right',
                }}>
                    <div style={{
                        width: '70%',
                        padding: '10px 10px 5px 5px',
                    }}>
                        <label style={{
                            width: '40%',
                        }}>Login Name:&nbsp;</label>
                        <input type='text' id='id' style={{
                            width: '60%',
                        }}>
                        </input>
                        <div style={{
                            height: '10px',
                        }}></div>
                        <label style={{
                            width: '40%',
                        }}>Display Name:&nbsp;</label>
                        <input type='text' id='id' style={{
                            width: '60%',
                        }}>
                        </input>
                        <div style={{
                            height: '10px',
                        }}></div>
                        <label style={{
                            width: '40%',
                        }}>Password :&nbsp;</label>
                        <input type='password' style={{
                            width: '60%',
                        }}>
                        </input>
                    </div>
                    <div style={{
                        padding: '10px 30px 10px 10px',
                        width: '30%',
                    }}>
                        <button style={{
                            backgroundColor: 'cyan',
                            width: '100%',
                            height: '110px',
                            borderRadius: '15px',
                            fontSize: '20px',
                        }}>
                            Enter 
                        </button>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                }}>
                    <Link to="/Login" style={{
                        width: '50%',
                        justifyContent: 'center',
                        color: 'white',
                    }}>
                      &#9626; Back to login
                    </Link>
                    
                    <HomeLink to="/" style={{
                        width: '50%',
                        justifyContent: 'center',
                    }}>
                        &#8635; Back to home
                    </HomeLink>
                </div>
            </div>
        </div>
    </div>
);
}


export default Register;

export const HomeLink = styled(Link)`
  color: #f0f0f0;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;