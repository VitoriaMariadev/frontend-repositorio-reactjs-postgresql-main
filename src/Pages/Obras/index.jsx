import {AiOutlineSearch} from 'react-icons/ai'
import './style.css'
import { api } from '../../Services/API'
import { useState, useEffect, useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Components/Header';


export const Obras = () => {
    
    const containerPesquisaObras = useRef(null)
    const [ Obras, setObras] = useState()
    const [Carregando, setCarregando] = useState(false)
    const [titulo,setTitulo] = useState('')
    const [encontrado, setEncontrado] = useState(true)

    const pegarObras = async () => {
        try {
            
            const res = await api.get("/mostrar_todas_obras")
            setObras(res.data)
            console.log(res.data)
            setCarregando(true)
        }
        catch (erro){
            console.log(erro)
        }
    }

    const pesquisarObra = async () =>{

        try{

            const res = await api.post("/pesquisar_nome_obra", {titulo})
            if (res.data.mensagem === 'Obra(s) não encontrado(s)') {
                setEncontrado(false)
                
              } else {
                setObras(res.data)
                setEncontrado(true)
                window.scrollTo(0,0)
              }

            
            

        }catch(err){
            console.log(err)
        }

    }

    useEffect(() => {
        pegarObras()
    }, 
    [])

    useEffect(() =>{

        containerPesquisaObras.current?.scrollIntoView({behavior: "smooth"})
    })
    
    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
   
    }, [titulo])
    const detectKeyDown = (e) => {
        if (e.key === 'Enter'){
            pesquisarObra()
        }
    }

    useEffect(() => {
        pesquisarObra()
    }, [titulo])
    
    return (
        <>
            <Header/>
            <main className="main">
                <div className="containerUsuario">
                    <div className="containerUsuario-pesquisa" ref={containerPesquisaObras}>
                        <div className="containerUsuario-pesquisa-barra">
                            <div className="containerUsuario-pesquisa-barra-btn">
                                <AiOutlineSearch onClick={pesquisarObra} className='containerUsuario-pesquisa-barra-loupe'/>
                            </div>
                            
                            <input type="text" value={titulo} placeholder="Pesquisar" onChange={(e) => setTitulo(e.target.value)}/>
                        </div>
                        <div className='containerUsuario-pesquisa-obras'>
                            

                            {encontrado?(
                                <>
                                {
                                    Obras?(
                                        <>
                                            <h1>Obras</h1>
                                        {
                                            Obras.map((item, index) => (
                                                <div className='containerUsuario-pesquisa-mostrarObras' key={index}>
                                                    <div className="containerUsuario-pesquisa-mostrarObras-titulos">
                
                                                        <h3>Titulo: {item.titulo}</h3>
                
                                                        <h3>Autores: {item.autores}</h3>
                                                    </div>
                
                                                    <div className="containerUsuario-pesquisa-mostrarObras-resumo">
                                                    <h3> Resumo: </h3>
                                                        <p> { item.resumo } </p>
                                                    </div>
                                                
                                                </div>
                                            ))
                                        }
                                        </>
                                    ): (
                                        <CircularProgress/>
                                    )
                                }
                                </>
                            ):(
                                <h1>Obra não encontrada!</h1>
                            )}

                                
                            
                            

                        </div>
                        
                    </div>

                    <div className="containerUsuario-obras">
                        <div className="containerUsuario-obras-divisao">
                            <div className="containerUsuario-obras-divisao-titulo">
                                <h1>Titulo</h1>
                            </div>
                            <div className='containerUsuario-obras-divisao-conteudo'>
                                {Carregando === true?(
                                    Obras.map((item, index) => (
                                        <div key={index} className="containerUsuario-obras-divisao-conteudo-titulo">
                                            <h4 >{item.titulo}</h4>
                                            {/* <h4 onClick={() => pesquisarObraTitulo(item._id)}>{item.titulo}</h4> */}
                                        </div>

                                    ))
                                ): (
                                    <CircularProgress/>
                                )
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}