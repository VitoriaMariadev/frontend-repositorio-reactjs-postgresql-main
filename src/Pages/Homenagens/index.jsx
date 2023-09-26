import { Enfeite } from "../../Components/Enfeite"
import { useState } from "react"
import Header from "../../Components/Header"
import './style.css'
import {BsFilter} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'

const Homenagens = () => {
    const [modelFiltro, setModelFiltro] = useState(false)

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
                                    <div  className="main-obras-todas-container-mostrar-container-pesquisa-lupa">
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
                                    {modelFiltro?(
                                        <>
                                        
                                            <h2 className='filtros'>FILTROS</h2>
                                            <div className="main-obras-todas-container-mostrar-container-obras-classificacao">
                                                <p>Data de publicação</p>
                                                <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes">
                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-recentes check-box">
                                                        <p>Obras recentes</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-antigas check-box">
                                                        <p>Obras antigas</p>
                                                    </div>
                                                </div>

                                                
                                            </div>

                                            <div className="main-obras-todas-container-mostrar-container-obras-classificacao">
                                                <p>Data de criação</p>
                                                <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes">
                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-recentes check-box" >
                        
                                                        <p>Obras recentes</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-antigas check-box">
                            
                                                        <p>Obras antigas</p>
                                                    </div>
                                                </div>

                                                
                                            </div>

                                            <div className="main-obras-todas-container-mostrar-container-obras-autores">
                                                <p>Autores</p>
                                                <div className="main-obras-todas-container-mostrar-container-obras-autores-opcoes">
                                                    <div className="main-obras-todas-container-mostrar-container-obras-autores-opcoes-todos-autores check-box">
                                                        <p>Todos os autores</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-autores-opcoes-capistrano check-box">
             
                                                        <p>Capistrano de Abreu</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-autores-opcoes-pesquisar check-box">
                      
                                                        <div className="main-obras-todas-container-mostrar-container-obras-autores-opcoes-pesquisar-input">
                                                            <input type="text" placeholder='Nome do autor'/>
                                                            <button>Buscar</button>
                                                        </div>
                                                    </div>
                                                </div>   
                                            </div>

                                            <div className="main-obras-todas-container-mostrar-container-obras-classificacao">
                                                <p>Ordem</p>
                                                <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes">
                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-recentes check-box">
                                                        <p>A - Z</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-antigas check-box">
                                
                                                        <p>Aleátoria</p>
                                                    </div>
                                                </div>   
                                            </div>

                                            <div className="main-obras-todas-container-mostrar-container-obras-topicos">
                                                <p>Tópicos</p>
                                                <ul>

                                                </ul>
                                                 
                                            </div>

                                            

                                            
                                        </>
                                    ):(
                                    <>
                                        
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
                            <h1>HOMENAGENS</h1>
                         </div>
                        
                    <div className="main-obras-ver-container-mostrar-container"></div>
                    
                    </div>
                    </div>
                </div>
            </main>

        </div>
    )
}
export default Homenagens