import { Enfeite } from "../../Components/Enfeite"
import Header from "../../Components/Header"
import './style.css'

const Biografia = () => {
    return (    
        <div>
            <Header/>
            <Enfeite/>
            <main className="main-biografia">

                <div className="main-biografia-container">
                    
                    <div className="main-biografia-container-biografia">

                        <div className="main-biografia-container-titulo">
                            <h1>CAPISTRANO DE ABREU</h1>
                        </div>

                        <div className="main-biografia-container-informacoes">
                            <div className="main-biografia-container-informacoes-img">
                                <div className="main-biografia-container-informacoes-img-fundo"></div>
                            </div>

                            <div className="main-biografia-container-informacoes-texto">
                                <p>23 de outubro de 1853 - 13 de agosto de 1927</p>
                                <p>Ocupação: Escritor, historiador e bibliotecário</p>
                                <p>Religião: Católico</p>
                            </div>
                        </div>

                        <div className="linha">
                            <hr />
                        </div>
                        

                        <div className="main-biografia-container-texto">
                            <p>João Capistrano Honório de Abreu nasceu na cidade de Maranguape, Ceará, em 23 de outubro de 1853. Fez seus primeiros estudos em rápidas passagens por várias escolas. Em 1869, viajou para Recife, onde cursou humanidades, retornando ao Ceará dois anos depois. Em Fortaleza, foi um dos fundadores da Academia Francesa, órgão de cultura e debates, progressista e anticlerical, que durou de 1872 a 1875.</p>
                            <p>Neste último ano, viajou para o Rio de Janeiro e aí se fixou em um sobrado situado no bairro de Botafogo; hoje esta Rua leva seu nome por homenagem póstuma, tornando-se empregado da Editora Garnier. Foi aprovado em concurso público para bibliotecário da Biblioteca Nacional durante a gestão de Ramiz Galvão. Em 1879, foi nomeado oficial da Biblioteca Nacional. Lecionou Corografia e História do Brasil no Colégio Pedro II, nomeado por concurso em que apresentou tese sobre O descobrimento do Brasil e o seu desenvolvimento no século XVI.</p>
                            <p>Dedicou-se ao estudo da história colonial brasileira, elaborando uma teoria da literatura nacional, tendo por base os conceitos de clima, terra e raça, que reproduzia os clichês típicos do colonialismo europeu acerca dos trópicos, invertendo, todavia, o mito pré-romântico do «bom selvagem». Morreu no Rio de Janeiro, aos 73 anos, em 13 de agosto de 1927.[4][5]</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}
export default Biografia