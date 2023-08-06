import {AiOutlineSearch} from 'react-icons/ai'
import './style.css'
import { api } from '../../Services/API'
import { useState, useEffect, useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Components/Header';
import { Enfeite } from '../../Components/Enfeite';
import {BsFilter} from 'react-icons/bs'

export const Obras = () => {
    const [carregando, setCarregando] = useState(false)
    const [pegarObras, setPegarObras] = useState('')

    const obras = async () => {
        try {
            
            const res = await api.get('/mostrar_todas_obras')
            console.log(res.data)
            setPegarObras(res.data)
            setCarregando(true)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obras()
    }, [])

    return (
        <>     
            <Header></Header>
            
            <main className="main-obras">
                <Enfeite/>
                <div className="main-obras-todas">
                    <div className="main-obras-todas-container">
                        <div className="main-obras-todas-container-mostrar">
                            <div className="main-obras-todas-container-mostrar-titulo">
                                <h1>TITULOS</h1>
                            </div>

                            <div className="main-obras-todas-container-mostrar-container">
                                <div className="main-obras-todas-container-mostrar-container-pesquisa">
                                    <div className="main-obras-todas-container-mostrar-container-pesquisa-lupa">
                                        <AiOutlineSearch/>
                                    </div>
                                    <div className="main-obras-todas-container-mostrar-container-pesquisa-barra">
                                        <input placeholder='Procurar título' type="text"/>
                                    </div>
                                    <div className="main-obras-todas-container-mostrar-container-pesquisa-filtro">
                                        <BsFilter/>
                                    </div>
                                </div>
                                <div className="main-obras-todas-container-mostrar-container-obras">
                                    {carregando?(

                                        pegarObras.map((item, index) => (
                                            <>
                                                <div className="main-obras-todas-container-mostrar-container-obras-container">
                                                    <div className="main-obras-todas-container-mostrar-container-obras-container-titulo">
                                                        <h3>{item.titulo}</h3>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-container-paragrafo">
                                                        <p>{item.resumo}</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-container-rodape">
                                                        <p>{item.usuario}, {item.data_publi.slice(0,4)}</p>
                                                    </div>
                                                    
                                                </div>
                                            </>
                                        ))

                                    ):(
                                        <p>Carregando...</p>
                                    )}
                                </div>
                            </div>
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