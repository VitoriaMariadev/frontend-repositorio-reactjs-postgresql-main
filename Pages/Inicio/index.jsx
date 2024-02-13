import Header from "../../Components/Header"
import React, {useEffect, useState} from "react"
import './style.css'

import CapistranoLogo from '../../Images/Capistrano.png'
import Estatuaimg from '../../Images/Estatua-capistrano.png'
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";

const Inicio = () =>{


   
     

    const [indexLista, setindexLista] = useState(1)

    const proxSlide = () => {
    
        if(indexLista !== 3) {
            setindexLista(indexLista + 1)
            
            
            
        } else if(indexLista === 3) {
            setindexLista(1)
            

        }
        
    }
    
    const voltarSlide = () => {
        
        if(indexLista !== 1) {
            setindexLista(indexLista - 1)
            
            
        } else if(indexLista === 1) {
            setindexLista(3)
            
            
        }
        
    }

    return(
        <div>
            <Header/>
            <main>
                <div className="container-slider" >
                    <button className="btn right" onClick={proxSlide}><FaArrowRight/></button>
                    <button className="btn left" onClick={voltarSlide}><FaArrowLeft/></button>
                    {
                        indexLista === 1&&
                        <div className="container-slider-conteudo" > 
                            <div className="container-slider-conteudo-bolinhas-um"></div>
                            <div className="container-slider-conteudo-bolinhas-dois"></div>
                            <div className="container-slider-conteudo-bolinhas-tres"></div>
                            <div className="container-slider-conteudo-bolinhas-quatro"></div>
                            <div className="container-slider-conteudo-bolinhas-cinco"></div>
                            <div className="container-slider-conteudo-bolinhas-seis"></div>
                            <div className="container-slider-conteudo-bolinhas-sete"></div>
                            
                            <div className="container-slider-conteudo-radius"></div>
                            <div className="container-slider-conteudo-radius-dois"></div>
                        
                            <div className="container-slider-conteudo-texto">
                                <div className="container-slider-conteudo-texto-titulo">  
                                    <h1>João Capistrano Honório de Abreu</h1>
                                </div>
                                <div className="container-slider-conteudo-texto-paragrafo">
                                    <p>Foi um renomado historiador brasileiro e um dos pioneiros no campo da historiografia no país. Além disso, contribuiu significativamente para os campos da etnografia e da linguística. Sua obra é reconhecida pelo rigoroso exame das fontes e pela visão crítica dos acontecimentos históricos, estabelecendo um contraponto importante em relação às pesquisas de Francisco Adolfo de Varnhagen.</p>
                                </div>
                            </div>
                            <div className="container-slider-conteudo-imagem">
                                <div className="container-slider-conteudo-imagem-Capistrano"/>
                            </div>
                            
                        </div>

                    }
                    {
                        indexLista ===2&&
                        <div className="container-slider-conteudo" > 
                            <div className="container-slider-conteudo-bolinhas-um"></div>
                            <div className="container-slider-conteudo-bolinhas-dois"></div>
                            <div className="container-slider-conteudo-bolinhas-tres"></div>
                            <div className="container-slider-conteudo-bolinhas-quatro"></div>
                            <div className="container-slider-conteudo-bolinhas-cinco"></div>
                            <div className="container-slider-conteudo-bolinhas-seis"></div>
                            <div className="container-slider-conteudo-bolinhas-sete"></div>
                            
                            <div className="container-slider-conteudo-radius"></div>
                            <div className="container-slider-conteudo-radius-dois"></div>
                        
                            <div className="container-slider-conteudo-texto">
                                <div className="container-slider-conteudo-texto-titulo">  
                                    <h1>Estatua Capistrano de Abreu</h1>
                                </div>
                                <div className="container-slider-conteudo-texto-paragrafo">
                                    <p>A Praça Capistrano de Abreu é um verdadeiro encanto para todos que a visitam. Sua beleza paisagística e a presença dos monumentos tornam o local ainda mais especial. Um dos monumentos que chama a atenção é a estátua de Capistrano de Abreu, que se destaca no centro da praça com seus imponentes 2 metros de altura. Essa estátua é uma forma de homenagear o renomado escritor e evidencia a importância de sua obra para a cidade.</p>
                                </div>
                            </div>
                            <div className="container-slider-conteudo-imagem">
                                <div className="container-slider-conteudo-imagem-Estatua"/>
                            </div>
                        </div>
                    }
                    {
                        indexLista ===3&&
                        <div className="container-slider-conteudo"  > 
                            <div className="container-slider-conteudo-bolinhas-um"></div>
                            <div className="container-slider-conteudo-bolinhas-dois"></div>
                            <div className="container-slider-conteudo-bolinhas-tres"></div>
                            <div className="container-slider-conteudo-bolinhas-quatro"></div>
                            <div className="container-slider-conteudo-bolinhas-cinco"></div>
                            <div className="container-slider-conteudo-bolinhas-seis"></div>
                            <div className="container-slider-conteudo-bolinhas-sete"></div>
                            
                            <div className="container-slider-conteudo-radius"></div>
                            <div className="container-slider-conteudo-radius-dois"></div>
                        
                            <div className="container-slider-conteudo-texto obras">
                                <div className="container-slider-conteudo-texto-titulo">  
                                <h1>Obras</h1>
                                </div>
                                <div className="container-slider-conteudo-texto-paragrafo">
                                <p>A obra de Capistrano de Abreu é reconhecida por sua rigorosa investigação das fontes e por sua visão crítica dos fatos históricos. Seus estudos e pesquisas estabelecem um contraponto importante em relação aos trabalhos de Francisco Adolfo de Varnhagen.</p>
                                </div>
                            </div>
                            <div className="container-slider-conteudo-imagem">
                                <div className="container-slider-conteudo-imagem-Livros"/>
                            </div>
                        </div>
                    }
                </div>
            </main>
        </div>
    )
}

export default Inicio