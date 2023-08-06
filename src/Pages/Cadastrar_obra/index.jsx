import { useEffect, useState } from "react"
import { Enfeite } from "../../Components/Enfeite"
import Header from "../../Components/Header"
import './style.css'
import { api } from "../../Services/API"
import { pegarIdUsuario } from "../../Services/localstorage"

export const CadastrarObras = () => {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [link, setLink] = useState('')
    const [autor, setAutor] = useState('')
    const [resumo, setResumo] = useState('')
    const [assunto, setAssuntos] = useState('')
    const [imagem, setImagem] = useState('')
    const [listaAutores, setListaAutores] = useState([])
    const [listaLinks, setlistaLinks] = useState([])
    const [listaAssuntos, setListaAssuntos] = useState([])
    const [listaImagens, setListaImagens] = useState([])
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
    const [adicionarAutor, setAdicionarAutor] = useState('none')
    const [adicionarAssunto, setAdicionarAssunto] = useState('none')
    const [adicionarLink, setAdicionarLink] = useState('none')
    const [adicionarImagem, setAdicionarImagem] = useState('none')
    const [idUsuario, setIdUsuario] = useState('')


    // Cadastrar Informações

    const cadastrarObra = async () => {
        const data = {
            titulo,
            descricao,
            resumo,
            data_publi:new Date(),
            autor: listaAutores,
            assunto:listaAssuntos,
            link: [adicionarLink],
            img: [adicionarImagem],
            usuario:idUsuario
        }
        
        console.log(data)

        try {
            const res = await api.post('/cadastro_obras', data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

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

    // Adicionar as Listas

    const adicionarAutores = (nome) => {
        if(adicionarAutor !== 'none' && !listaAutores.includes(adicionarAutor)){
            const novoAutor = adicionarAutor
            const novaListaAutor = [...listaAutores, novoAutor]
            setListaAutores(novaListaAutor)
            console.log('lista de autores', listaAutores)

        }
    }

    const adicionarAssuntos = (nome) => {
        if(adicionarAssunto !== 'none' && !listaAssuntos.includes(adicionarAssunto)){
            const novoAssunto = adicionarAssunto
            const novaListaAssunto= [...listaAssuntos, novoAssunto]
            setListaAssuntos(novaListaAssunto)
            console.log('lista de assuntos', listaAssuntos)

        }
    }

    // Apagar da lista

    const apagarDaListaAutores = (valor) => {
        const novaListaAutores = [...listaAutores]; // Cria uma cópia da lista original
        novaListaAutores.splice(valor, 1); // Remove o elemento da nova lista
        setListaAutores(novaListaAutores); // Atualiza o estado com a nova lista
    }

    const apagarDaListaAssuntos = (valor) => {
        const novaListaAssuntos = [...listaAssuntos]; // Cria uma cópia da lista original
        novaListaAssuntos.splice(valor, 1); // Remove o elemento da nova lista
        setListaAssuntos(novaListaAssuntos); // Atualiza o estado com a nova lista
    }

    // Carregando Informações
    useEffect(() =>{
        const novoId = pegarIdUsuario()
        setIdUsuario(novoId)
    }, [])

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

    useEffect(() => {
        adicionarAutores()
    }, [adicionarAutor])

    useEffect(() => {
        adicionarAssuntos()
    }, [adicionarAssunto])

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
                                    <input type="text" onChange={(e) => setAdicionarLink(e.target.value)}/>
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
                                    <select onChange={(e) => setAdicionarAutor(e.target.value)}>
                                        <option value="none"></option>
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
                                <ul>
                                    {listaAutores.map((item, index) => (
                                        <il key={index} onClick={() => apagarDaListaAutores(index)}>{item}</il>
                                    ))}
                                </ul>

                            </div>

                            <div className="main-cadastrar-obras-container-formulario-direita-autores-resumo">
                                <p>Resumo da obra</p>
                                <textarea value={resumo} onChange={(e) => setResumo(e.target.value)}></textarea>
                            </div>

                            <div className="main-cadastrar-obras-container-formulario-direita-topicos">
                                <p>Tópicos</p>
                                <div className="main-cadastrar-obras-container-formulario-direita-topicos-input">
                                    <select onChange={(e) => setAdicionarAssunto(e.target.value)}>
                                        <option value="none"></option>
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
                                <ul>
                                    {listaAssuntos.map((item, index) => (
                                        <il key={index} onClick={() => apagarDaListaAssuntos(index)}>{item}</il>
                                    ))}

                                </ul>

                            </div>

                            <div className="main-cadastrar-obras-container-formulario-direita-imagens">
                                <p>Link de imagens</p>
                                <div className="main-cadastrar-obras-container-formulario-direita-imagens-input">
                                    <input type="text" onChange={(e) => setAdicionarImagem(e.target.value)}/>
                                    <button onClick={AbrirModelImagens}>+</button>
                                </div>
                                <a className="ver-links">
                                    Visualizar links adicionados
                                </a>

                            </div>

                            <div className="main-cadastrar-obras-container-formulario-direita-publicar">
                                <button onClick={cadastrarObra}>Publicar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}