import { useEffect, useState } from "react"
import { Enfeite } from "../../Components/Enfeite"
import Header from "../../Components/Header"
import './style.css'
import { api } from "../../Services/API"

export const CadastrarObras = () => {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [link, setLink] = useState('')
    const [autor, setAutor] = useState('')
    const [resumo, setResumo] = useState('')
    const [assunto, setAssuntos] = useState('')
    const [imagem, setImagem] = useState('')
    const [listaAutores, setListaAutores] = useState('')
    const [listaLinks, setlistaLinks] = useState('')
    const [listaAssuntos, setListaAssuntos] = useState('')
    const [listaImagens, setListaImagens] = useState('')
    const [todosAutoes, setTodosAutores] = useState('')
    const [todosLinks, setTodosLinks] = useState('')
    const [todosAssuntos, setTodosAssuntos] = useState('')
    const [todasImagens, setTodasImagens] = useState('')
    const [carregandoAutor, setCarregandoAutor] = useState(false)
    const [carregandoLink, setCarregandoLink] = useState(false)
    const [carregandoAssunto, setCarregandoAssunto] = useState(false)
    const [carregandoImagem, setCarregandoImagem] = useState(false)
    const [modelAutores, setModelAutores] = useState('')
    const [modelAssuntos, setModelAssuntos] = useState('')
    const [modelLinks, setModelLinks] = useState('')
    const [modelImagens, setModelImagens] = useState('')

    // Cadastrar Informações

    const cadastrarAutores = async () => {
        const data = {
            nome:autor
        }

        try {

            const res = await api.post('/cadastro_autor', data)
            console.log(res.data)
            setAutor('')
            setModelAutores(false)
            
            
        } catch (error) {
            console.log(error)
        }
    }

    const cadastrarLink = async () => {
        const data = {
            link:link
        }

        try {

            const res = await api.post('/cadastrar_link', data)
            console.log(res.data)
            setLink('')
            
        } catch (error) {
            console.log(error)
        }
    }

    const cadastrarAssuntos = async () => {
        const data = {
            nome:assunto
        }

        try {

            const res = await api.post('/cadastrar_assunto', data)
            console.log(res.data)
            setAssuntos('')
            setModelAssuntos(false)
            
        } catch (error) {
            console.log(error)
        }
    }

    const cadastrarImagens = async () => {
        const data = {
            link:imagem
        }

        try {

            const res = await api.post('/cadastrar_img', data)
            console.log(res.data)
            setImagem('')
            
        } catch (error) {
            console.log(error)
        }
    }

    // Pegar Informações

    const pegarAutores = async () => {
        try {

            const res = await api.get('/mostrar_todos_autores')
            console.log(res.data)
            setTodosAutores(res.data)
            setCarregandoAutor(true)

            
        } catch (error) {
            console.log(error)
        }
    }

    const pegarLinks = async () => {
        try {

            const res = await api.get('/msotrar_todos_links')
            console.log(res.data)
            setTodosLinks(res.data)
            setCarregandoLink(true)

            
        } catch (error) {
            console.log(error)
        }
    }

    const pegarAssuntos = async () => {
        try {

            const res = await api.post('/mostrar_assuntos')
            console.log(res.data)
            setTodosAssuntos(res.data)
            setCarregandoAssunto(true)

            
        } catch (error) {
            console.log(error)
        }
    }

    const pegarImagens = async () => {
        try {

            const res = await api.get('/msotrar_todos_imgs')
            console.log(res.data)
            setTodasImagens(res.data)
            setCarregandoImagem(true)

            
        } catch (error) {
            console.log(error)
        }
    }

    // Abrir models

    const AbrirModelAutores = () => {
        if(modelAutores){
            setModelAutores(false)
        }else{
            setModelAutores(true)
        }
    }

    const AbrirModelAssuntos = () => {
        if(modelAssuntos){
            setModelAssuntos(false)
        }else{
            setModelAssuntos(true)
        }
    }

    const AbrirModelLinks = () => {
        if(modelLinks){
            setModelLinks(false)
        }else{
            setModelLinks(true)
        }
    }

    const AbrirModelImagens = () => {
        if(modelImagens){
            setModelImagens(false)
        }else{
            setModelImagens(true)
        }
    }

    // Carregando Informações

    useEffect(() => {
        pegarAssuntos()
    }, [assunto])

    useEffect(() => {
        pegarAutores()
    }, [autor])

    useEffect(() => {
        pegarLinks()
    }, [])

    useEffect(() => {
        pegarImagens()
    }, [])

    return(
        <>

            <Header/>
            <Enfeite/>
            <main className="main-cadastrar-obras">

                {modelAutores&&(
                    <>
                    
                        <div className="model-autores">
                            <h3>CADASTRAR AUTOR</h3>
                            <div className="model-autores-input">
                                <p>Nome</p>
                                <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)}/>
                            </div>

                            <div className="model-autores-btn">
                                <button className="model-autores-btn-cancelar" onClick={AbrirModelAutores}>Cancelar</button>
                                <button className="model-autores-btn-cadastrar" onClick={cadastrarAutores}>Cadastrar</button>
                            </div>

                        </div>

                    </>
                )}


                {modelAssuntos&&(
                    <>
                    
                        <div className="model-autores">
                            <h3>CADASTRAR TÓPICOS</h3>
                            <div className="model-autores-input">
                                <p>Tópico</p>
                                <input type="text" value={assunto} onChange={(e) => setAssuntos(e.target.value)}/>
                            </div>

                            <div className="model-autores-btn">
                                <button className="model-autores-btn-cancelar" onClick={AbrirModelAssuntos}>Cancelar</button>
                                <button className="model-autores-btn-cadastrar" onClick={cadastrarAssuntos}>Cadastrar</button>
                            </div>

                        </div>

                    </>
                )}

                <div className="main-cadastrar-obras-container">
                    <div className="main-cadastrar-obras-container-titulo">
                        <h1>PUBLICAR OBRA</h1>
                    </div>

                    <div className="main-cadastrar-obras-container-formulario">
                        <div className="main-cadastrar-obras-container-formulario-esquerda">
                            <div className="main-cadastrar-obras-container-formulario-esquerda-titulo">
                                <p>Título da obra</p>
                                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>

                            </div>

                            <div className="main-cadastrar-obras-container-formulario-esquerda-descricao">
                                <p>Descrição da obra</p>
                                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                            </div>

                            <div className="main-cadastrar-obras-container-formulario-esquerda-link">
                                <p>Link</p>
                                <div className="main-cadastrar-obras-container-formulario-esquerda-link-input">
                                    <input type="text" />
                                    <button onClick={AbrirModelLinks}>+</button>
                                </div>
                                <a className="ver-links">
                                    Visualizar links adicionados
                                </a>

                            </div>
                        </div>
                        <div className="main-cadastrar-obras-container-formulario-direita">

                            <div className="main-cadastrar-obras-container-formulario-direita-autores">
                                <p>Autores</p>
                                <div className="main-cadastrar-obras-container-formulario-direita-autores-input">
                                    <select>
                                        <option value=""></option>
                                        {carregandoAutor&&(
                                            <>
                                                {todosAutoes.map((item) => (
                                                    <option value={item.nome}>{item.nome}</option>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                    <button onClick={AbrirModelAutores}>+</button>
                                </div>

                            </div>

                            <div className="main-cadastrar-obras-container-formulario-direita-autores-resumo">
                                <p>Resumo da obra</p>
                                <textarea value={resumo} onChange={(e) => setResumo(e.target.value)}></textarea>
                            </div>

                            <div className="main-cadastrar-obras-container-formulario-direita-topicos">
                                <p>Tópicos</p>
                                <div className="main-cadastrar-obras-container-formulario-direita-topicos-input">
                                    <select>
                                        <option value=""></option>
                                        {carregandoAssunto&&(
                                            <>
                                            
                                                {todosAssuntos.map((item) => (
                                                    <option value={item.nome}>{item.nome}</option>
                                                ))}

                                            </>
                                        )}
                                    </select>
                                    <button onClick={AbrirModelAssuntos}>+</button>
                                </div>

                            </div>

                            <div className="main-cadastrar-obras-container-formulario-direita-imagens">
                                <p>Link de imagens</p>
                                <div className="main-cadastrar-obras-container-formulario-direita-imagens-input">
                                    <select>
                                        <option value=""></option>
                                    </select>
                                    <button onClick={AbrirModelImagens}>+</button>
                                </div>
                                <a className="ver-links">
                                    Visualizar links adicionados
                                </a>

                            </div>

                            <div className="main-cadastrar-obras-container-formulario-direita-publicar">
                                <button>Publicar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}