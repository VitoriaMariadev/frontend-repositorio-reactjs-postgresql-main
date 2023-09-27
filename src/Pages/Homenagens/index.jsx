import { Enfeite } from "../../Components/Enfeite"
import { useState, useEffect } from "react"
import Header from "../../Components/Header"
import './style.css'
import {BsFilter} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import { api } from '../../Services/API'

const Homenagens = () => {
    const [modelFiltro, setModelFiltro] = useState(false)
    const [carregando, setCarregando] = useState(false)
    const [carregandoId, setCarregandoId] = useState(false)
    const [pegarHomenagens, setPegarHomenagens] = useState('')
    const [pegarHomenagensId, setPegarHomenagensId] = useState('')

    // Pegar Homengens

    const homenagens = async () => {
        try {
            const res = await api.get('/mostrar_homenagens')
            setPegarHomenagens(res.data)
            setCarregando(true)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const homenagensPorId = async (id) => {
        try {
            const res = await api.get('/mostrar_homenagem/' + id)
            setPegarHomenagensId(res.data)
            setCarregandoId(true)
            // containerObras.current.scrollTo({ top: 0, behavior: 'smooth' })
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
       homenagens()
    }, [])


    const abrirModelFiltro = () => {
        if(modelFiltro){
            setModelFiltro(false)
        }else{
            setModelFiltro(true)
        }
    }
    return(
        <div>   
            <Header></Header>
            
            <main className="main-homenagens">
                <Enfeite/>
                <div className="main-homenagens-todas">
                    <div className="main-homenagens-todas-container">
                        <div className="main-homenagens-todas-container-mostrar">
                            <div className="main-homenagens-todas-container-mostrar-titulo">
                                <h1>HOMENAGENS</h1>
                            </div>

                            <div className="main-homenagens-todas-container-mostrar-container">
                                <div className="main-homenagens-todas-container-mostrar-container-pesquisa">
                                    <div  className="main-homenagens-todas-container-mostrar-container-pesquisa-lupa">
                                        <AiOutlineSearch/>
                                    </div>
                                    <div className="main-homenagens-todas-container-mostrar-container-pesquisa-barra">
                                        <input placeholder='Procurar homenagem' type="text"/>
                                    </div>
                                    <div className="main-homenagens-todas-container-mostrar-container-pesquisa-filtro" onClick={abrirModelFiltro}>
                                        <BsFilter/>
                                    </div>
                                </div>
                                <div className="main-homenagens-todas-container-mostrar-container-homenagens">
                                    {modelFiltro?(
                                        <>
                                        
                                            <h2 className='filtros'>FILTROS</h2>
                                            <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao">
                                                <p>Data de publicação</p>
                                                <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao-opcoes">
                                                    <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao-opcoes-homenagens-recentes check-box">
                                                        <p>homenagens recentes</p>
                                                    </div>

                                                    <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao-opcoes-homenagens-antigas check-box">
                                                        <p>homenagens antigas</p>
                                                    </div>
                                                </div>

                                                
                                            </div>

                                            <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao">
                                                <p>Data de criação</p>
                                                <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao-opcoes">
                                                    <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao-opcoes-homenagens-recentes check-box" >
                        
                                                        <p>homenagens recentes</p>
                                                    </div>

                                                    <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao-opcoes-homenagens-antigas check-box">
                            
                                                        <p>homenagens antigas</p>
                                                    </div>
                                                </div>

                                                
                                            </div>

                                            <div className="main-homenagens-todas-container-mostrar-container-homenagens-autores">
                                                <p>Autores</p>
                                                <div className="main-homenagens-todas-container-mostrar-container-homenagens-autores-opcoes">
                                                    <div className="main-homenagens-todas-container-mostrar-container-homenagens-autores-opcoes-todos-autores check-box">
                                                        <p>Todos os autores</p>
                                                    </div>

                                                    <div className="main-homenagens-todas-container-mostrar-container-homenagens-autores-opcoes-capistrano check-box">
             
                                                        <p>Capistrano de Abreu</p>
                                                    </div>

                                                    <div className="main-homenagens-todas-container-mostrar-container-homenagens-autores-opcoes-pesquisar check-box">
                      
                                                        <div className="main-homenagens-todas-container-mostrar-container-homenagens-autores-opcoes-pesquisar-input">
                                                            <input type="text" placeholder='Nome do autor'/>
                                                            <button>Buscar</button>
                                                        </div>
                                                    </div>
                                                </div>   
                                            </div>

                                            <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao">
                                                <p>Ordem</p>
                                                <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao-opcoes">
                                                    <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao-opcoes-homenagens-recentes check-box">
                                                        <p>A - Z</p>
                                                    </div>

                                                    <div className="main-homenagens-todas-container-mostrar-container-homenagens-classificacao-opcoes-homenagens-antigas check-box">
                                
                                                        <p>Aleátoria</p>
                                                    </div>
                                                </div>   
                                            </div>

                                            <div className="main-homenagens-todas-container-mostrar-container-homenagens-topicos">
                                                <p>Tópicos</p>
                                                <ul>

                                                </ul>
                                                 
                                            </div>

                                            

                                            
                                        </>
                                    ):(
                                    <>
                                        {carregando?(
                                            <>
                                                {pegarHomenagens.map((item, index) => (
                                                    <div className="main-homenagens-todas-container-mostrar-container-homenagens-container">
                                                        <h2 onClick={() => homenagensPorId(item.id_homenagem)} >{item.nome_homenagem}</h2>
                                                    </div>
                                                    
                                                ))}
                                            </>
                                        ):(
                                            <>
                                                <h3>Carregando...</h3>
                                            </>
                                        )}
                                    </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-homenagens-ver">
                    <div className="main-homenagens-ver-container">
                    <div className="main-homenagens-ver-container-mostrar">
                        <div className="main-homenagens-ver-container-mostrar-titulo">
                            <h1>HOMENAGENS</h1>
                         </div>
                        
                    <div className="main-homenagens-ver-container-mostrar-container">
                        <div className="main-homenagens-ver-container-mostrar-container-homenagem">
                            {carregandoId?(
                                <>
                                
                                    <div className="main-homenagens-ver-container-mostrar-container-homenagem-titulo">
                                        <h2>{pegarHomenagensId.nome_homenagem}</h2>
                                    </div>
                                    <div className="main-homenagens-ver-container-mostrar-container-homenagem-nome">
                                        <h1>Capistrano de Abreu</h1>
                                    </div>
                                    <div className="main-homenagens-ver-container-mostrar-container-homenagem-img">
                                        <img src={pegarHomenagensId.img} alt="" />
                                    </div>
                                    <div className="main-homenagens-ver-container-mostrar-container-homenagem-descricao">
                                        <p>{pegarHomenagensId.descricao}</p>
                                    </div>


                                </>
                            ):(
                                <>
                                    <div className="nenhuma-obra-selecionada">

                                        <h1>Nenhuma homenagem selecionada ainda</h1>

                                    </div>
                                </>
                            )}
                        </div>
                        <div className="main-homenagens-ver-container-mostrar-container-homenagem-rodape">
                            <div className="main-homenagens-ver-container-mostrar-container-homenagem-rodape-container">
                                {carregandoId&&(
                                    <>
                                        <p>Entregue por: {pegarHomenagensId.instituicoes}</p>
                                        <p>Data: {pegarHomenagensId.data_criacao}</p>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    </div>
                    </div>
                </div>
            </main>

        </div>
    )
}
export default Homenagens