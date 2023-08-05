import {AiOutlineSearch} from 'react-icons/ai'
import './style.css'
import { api } from '../../Services/API'
import { useState, useEffect, useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Components/Header';


export const Obras = () => {
    

    
    return (
        <>

            <Header></Header>
            <main className="main-obras">
                <div className="main-obras-todas">
                    <div className="main-obras-todas-container">
                        <div className="main-obras-todas-container-mostrar">
                            <div className="main-obras-todas-container-mostrar-titulo">
                                <h1>TITULOS</h1>
                            </div>

                            <div className="main-obras-todas-container-mostrar-container"></div>
                        </div>
                    </div>
                </div>
                <div className="main-obras-ver">
                    <div className="main-obras-ver-container">
                        <div className="main-obras-ver-container-mostrar">
                            <div className="main-obras-ver-container-mostrar-titulo">
                                <h1>CAPISTRANO DE ABREU</h1>
                            </div>

                            <div className="main-obras-ver-container-mostrar-container"></div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}