import {AiOutlineSearch} from 'react-icons/ai'
import './style.css'
import { api } from '../../Services/API'
import { useState, useEffect, useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Components/Header';
import { Enfeite } from '../../Components/Enfeite';
import {BsFilter} from 'react-icons/bs'

export const Obras = () => {
    const containerObras = useRef(null)
    const [carregando, setCarregando] = useState(false)
    const [pegarObras, setPegarObras] = useState('')
    const [pegarObraId, setPegarObraId] = useState('')
    const [carregandoId, setCarregandoId] = useState(false)
    const [titulo, setTitulo] = useState('')
    const [pesquisarTitulo, setPesquisarTitulo] = useState('')
    const [obraNaoEncontrada, setObraNaoEncontrada] = useState(false)
    const [modelFiltro, setModelFiltro] = useState(false)

    // Pegar Obras Por Id

    const pesquisarObraPorNome = async () => {
        const data = {
            titulo:pesquisarTitulo
        }

        try {

            const res = await api.post('/pesquisar_nome_obra', data)

            if (res.data.status === 400){
                setObraNaoEncontrada(true)
            }else{
                setCarregando(true)
                setPegarObras(res.data)
                setObraNaoEncontrada(false)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const pegarObraPorId = async (id) => {

        try {
            const res = await api.get('/mostrar_obraid/' + id)
            setPegarObraId(res.data)
            setCarregandoId(true)
            setTitulo(res.data.titulo)
            console.log(res.data)
            containerObras.current.scrollTo({ top: 0, behavior: 'smooth' })

        } catch (error) {
            console.log(error)
        }
    }

    const obras = async () => {
        try {
            
            const res = await api.get('/mostrar_todas_obras')
            setPegarObras(res.data)
            setCarregando(true)
            console.log(res.data)
            

        } catch (error) {
            console.log(error)
        }
    }

    // Abrir Model

    const abrirModelFiltro = () => {
        if(modelFiltro){
            setModelFiltro(false)
        }else{
            setModelFiltro(true)
        }
    }

    useEffect(() => {
        obras()
    }, [])

    useEffect(() => {
        pesquisarObraPorNome()
    }, [pesquisarTitulo])

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
                                    <div onClick={pesquisarObraPorNome}  className="main-obras-todas-container-mostrar-container-pesquisa-lupa">
                                        <AiOutlineSearch/>
                                    </div>
                                    <div className="main-obras-todas-container-mostrar-container-pesquisa-barra">
                                        <input placeholder='Procurar título' type="text" value={pesquisarTitulo} onChange={(e) => setPesquisarTitulo(e.target.value)}/>
                                    </div>
                                    <div className="main-obras-todas-container-mostrar-container-pesquisa-filtro" onClick={abrirModelFiltro}>
                                        <BsFilter/>
                                    </div>
                                </div>
                                <div className="main-obras-todas-container-mostrar-container-obras">
                                    {modelFiltro?(
                                        <>
                                        
                                            <h2 className='filtros'>FILTROS</h2>
                                            <div className="main-obras-todas-container-mostrar-container-obras-classificacao">
                                                <p>Classificação</p>
                                                <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes">
                                                    
                                                </div>
                                            </div>
                                        </>
                                    ):(
                                    <>
                                        {carregando?(

                                            obraNaoEncontrada?(
                                                <div className="obra-nao-encontrada">

                                                    <p >Obra não encontrada</p>
                                                </div>
                                                
                                            ):(
                                                <>
                                                    {pegarObras.map((item, index) => (
                                                    <>
                                                        <div className="main-obras-todas-container-mostrar-container-obras-container" key={index}>
                                                            <div className="main-obras-todas-container-mostrar-container-obras-container-titulo">
                                                                <h3 onClick={() => pegarObraPorId(item.id_obra)} >{item.titulo}</h3>
                                                            </div>

                                                            <div className="main-obras-todas-container-mostrar-container-obras-container-paragrafo">
                                                                {item.resumo.split('<br />').map((itens) => (
                                                                    <>
                                                                        
                                                                        <p>{itens}</p>
                                                                        <br/>
                                                                    
                                                                    </>
                                                                ))}
    
                                                                <div className="main-obras-todas-container-mostrar-container-obras-container-paragrafo-opacidade"></div>
                                                            </div>

                                                            <div className="main-obras-todas-container-mostrar-container-obras-container-rodape">
                                                                <p>{item.usuario}, {item.data_publi.slice(6,10)}</p>
                                                            </div>
                                                            
                                                        </div>
                                                    </>
                                            ))}
                                                </>
                                            )

                                            

                                        ):(
                                            <p>Carregando...</p>
                                        )}
                                    </>
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
                                {titulo.length > 31?(
                                    <h1 style={{fontSize:"1.6rem", letterSpacing:"2px"}}>{titulo}</h1>
                                ):(
                                    <h1>{titulo}</h1>
                                )}
                                
                            </div>

                            <div className="main-obras-ver-container-mostrar-container">
                                <div className="main-obras-ver-container-mostrar-container-obra" ref={containerObras}>
                                    {carregandoId?(

                                        <>

                                        <div className="main-obras-ver-container-mostrar-container-obra-assuntos">

                                            <ul>
                                                {pegarObraId.assuntos.split(',').map((topicos) => (
                                                    <li>{topicos}</li>
                                                ))}
                                            </ul>

                                        </div>
                                        
                                        <div className="main-obras-ver-container-mostrar-container-obra-descricao">
                                            
                                            {pegarObraId.descricao.split('<br />').map((item) => (
                                                <>
                                                    
                                                    <p>{item}</p>
                                                    <br/>
                                                
                                                </>
                                            ))}
                                        </div>
                                        <div className="main-obras-ver-container-mostrar-container-obra-traco">

                                        </div>
                                        <div className="main-obras-ver-container-mostrar-container-obra-liks">
                                            <h4>Fontes</h4>
                                            {pegarObraId.links.split(',').map((link) => (
                                                <a href={link} >{link}</a>
                                            ))}
                                            
                                            
                                        </div>

                                        </>

                                    ):(
                                        <>
                                            <div className="nenhuma-obra-selecionada">

                                                <h1>Nenhuma obra selecionada ainda</h1>

                                            </div>
                                            
                                        </>
                                    )}
                                </div>
                                <div className="main-obras-ver-container-mostrar-container-rodape">
                                    <div className="main-obras-ver-container-mostrar-container-rodape-container">
                                        {carregandoId&&(
                                            <>
                                                <p>Publicado por {pegarObraId.usuario}</p>
                                                <p>{pegarObraId.data_publi}</p>
                                            
                                            </>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}