import { useEffect, useState } from "react"
import { Enfeite } from "../../Components/Enfeite"
import Header from "../../Components/Header"
import './style.css'
import { api } from "../../Services/API"
import { pegarIdUsuario } from "../../Services/localstorage"
import { Aviso } from "../../Components/Aviso"
import {BsFillTrash3Fill} from 'react-icons/bs'
import {FiChevronDown} from 'react-icons/fi'
import {AiOutlineSearch} from 'react-icons/ai'

export const CadastrarObras = () => {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [link, setLink] = useState('')
    const [autor, setAutor] = useState('')
    const [resumo, setResumo] = useState('')
    const [assunto, setAssuntos] = useState('')
    const [imagem, setImagem] = useState('')
    const [dataCricao, setData] = useState('')
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
    const [modelMensagem, setModelMensagem] = useState('')
    const [modelVerImagem, setModelVerImagem] = useState(false)
    const [modelProcurarAutores, setModelProcurarAutores] = useState(false)
    const [modelProcurarTopicos, setModelProcurarTopicos] = useState(false)
    const [idUsuario, setIdUsuario] = useState('')
    const [tipoMensagem, setTipoMensagem] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [verImagem, setVerImagem] = useState('')

    // Cadastrar Informações

    const cadastrarObra = async () => {

        const dataHora = new Date()
        const novaDescricao = descricao.replace(/\n/g, "<br />")
        const novoResumo = resumo.replace(/\n/g, "<br />")

        const data = {
            titulo,
            descricao:novaDescricao,
            resumo:novoResumo,
            data_publi:dataHora.toLocaleString('pt-BR', { timezone: 'UTC' }),
            data_criacao:dataCricao,
            autor: listaAutores,
            assunto:listaAssuntos,
            link: listaLinks,
            img: listaImagens,
            usuario:idUsuario
        }

        console.log(data)

        try {
            
            console.log(data)
            const res = await api.post('/cadastro_obras', data)
            console.log(res.data)
            if (res.data.status === 400){
                setTipoMensagem('erro')
                setMensagem(res.data.Mensagem)
                setModelMensagem(true)
                
            }else{
                setModelMensagem(true)
                setTipoMensagem('sucesso')
                setMensagem(res.data.Mensagem)
                setTitulo('')
                setDescricao('')
                setResumo('')
                setListaAutores([])
                setListaAssuntos([])
                setlistaLinks([])
                setListaImagens([])
            

            }
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
            if (res.data.status === 400){
                setCarregandoAutor(false)
            }else{
                setTodosAutores(res.data)
                setCarregandoAutor(true)
            }
            

            
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
            if (res.data.status === 400){
                setCarregandoAssunto(false)
            }else{
                console.log(res.data)
                setTodosAssuntos(res.data)
                setCarregandoAssunto(true)
            }
            

            
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

    const pegarImagemParaVer = (url) => {
        setModelVerImagem(true)
        setVerImagem(url)
    }

    // Abrir models

    const fecharModelVerImagem = () => {
        setModelVerImagem(false)
    }

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

    const AbrirModelProcurarAutores = () => {
        if (modelProcurarAutores){
            setModelProcurarAutores(false)
        }else{
            setModelProcurarAutores(true)
        }
    }

    const AbrirModelProcurarTopicos = () => {
        if(modelProcurarTopicos){
            setModelProcurarTopicos(false)
        }else{
            setModelProcurarTopicos(true)
        }
    }

    // Adicionar as Listas

    const adicionarAutores = (nome) => {
        if (!listaAutores.includes(nome)){
            const novoAutor = nome
            const novaListaAutor = [...listaAutores, novoAutor]
            setListaAutores(novaListaAutor)
            console.log('lista de autores', listaAutores)
            setModelProcurarAutores(false)

        }

    }

    const adicionarAssuntos = (nome) => {
        if(!listaAssuntos.includes(nome)){
            const novoAssunto = nome
            const novaListaAssunto= [...listaAssuntos, novoAssunto]
            setListaAssuntos(novaListaAssunto)
            console.log('lista de assuntos', listaAssuntos)
            setModelProcurarTopicos(false)

        }
    }

    const adicionarLinks = (nome) => {
        if(link !== '' && !listaLinks.includes(link)){
            const novoLink = link
            const novaListaLinks = [...listaLinks, novoLink]
            setlistaLinks(novaListaLinks)
            setLink('')
            console.log('lista de Links', listaLinks)

        }
    }

    const adicionarImagens = (nome) => {
        if(imagem !== '' && !listaImagens.includes(imagem)){
            const novaImagem = imagem
            const novaListaImagens = [...listaImagens, novaImagem]
            setListaImagens(novaListaImagens)
            setImagem('')
            console.log('lista de Imagens', listaImagens)

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

    const apagarDaListaLinks = (valor) => {
        const novaListaLinks = [...listaLinks]; // Cria uma cópia da lista original
        novaListaLinks.splice(valor, 1); // Remove o elemento da nova lista
        setlistaLinks(novaListaLinks); // Atualiza o estado com a nova lista
    }

    const apagarDaListaImagens = (valor) => {
        const novaListaImagens = [...listaImagens]; // Cria uma cópia da lista original
        novaListaImagens.splice(valor, 1); // Remove o elemento da nova lista
        setListaImagens(novaListaImagens); // Atualiza o estado com a nova lista
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


    return(
        <>

            <Header/>
            <Enfeite/>

            {modelMensagem&&(
                <Aviso tipo={tipoMensagem} mensagem={mensagem} acao="CADASTRAR"/>
            )}
            
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

                {modelLinks&&(
                    <>
                    
                        <div className="links-cadastrados">
                            <h3>LINKS</h3>
                            <div className="links-cadastrados-container">
                                {listaLinks.map((item, index) => (
                                    <div className="links-cadastrados-container-link">
                                        <a href={item} target="_blank">{item}</a>
                                        <div className="links-cadastrados-container-link-apagar" onClick={() => apagarDaListaLinks(index)}><BsFillTrash3Fill/></div>

                                    </div>
                                ))}
                            </div>
                            <div className="links-cadastrados-btn">
                                <button onClick={AbrirModelLinks}>Ok</button>
                            </div>
                        </div>

                    </>
                )}

                {modelImagens&&(
                    <>
                    
                        <div className="links-cadastrados">
                            <h3>IMAGENS</h3>
                            <div className="links-cadastrados-container">
                                {listaImagens.map((item, index) => (
                                    <div className="links-cadastrados-container-link">
                                        <a href={item} target="_blank">{item}</a>
                                        <div className="links-cadastrados-container-link-apagar" onClick={() => apagarDaListaImagens(index)}><BsFillTrash3Fill/></div>

                                    </div>
                                ))}
                            </div>
                            <div className="links-cadastrados-btn">
                                <button onClick={AbrirModelImagens}>Ok</button>
                            </div>
                        </div>

                    </>
                )}

                {modelVerImagem&&(
                    <div className="model-ver-imagem">
                                <img src={verImagem} alt="" />

                        <div className="model-ver-imagem-btn">
                            <button onClick={fecharModelVerImagem}>Ok</button>
                        </div>
                    </div>
                )}

                {modelProcurarAutores&&(
                    <div className="model-procurar-autores">
                        <div className="model-procurar-autores-titulo">
                            <p onClick={AbrirModelProcurarAutores}>X</p>
                            <h2>AUTORES</h2>
                        </div>

                        <div className="model-procurar-autores-pesquisa">
                            <div className="model-procurar-autores-pesquisa-icon">
                                <AiOutlineSearch/>
                            </div>
                            <input type="text" placeholder="Procurar autor" />
                        </div>

                        {carregandoAutor?(
                            <>

                            <div className="model-procurar-autores-container">
                                    {todosAutoes.map((item) => (
                                        <div className="model-procurar-autores-container-nomes">
                                            <h3 onClick={() => adicionarAutores(item.nome)}>{item.nome}</h3>
                                        </div>
                                    ))}
                                
                            </div>
                            </>
                        ):(
                            <>
                                <p>Carregando...</p>
                            </>
                        )}
                        
                    </div>
                )}

                {modelProcurarTopicos&&(
                    <div className="model-procurar-topicos">
                        <div className="model-procurar-topicos-titulo">
                            <p onClick={AbrirModelProcurarTopicos}>X</p>
                            <h2>TOPICOS</h2>
                        </div>

                        <div className="model-procurar-topicos-pesquisa">
                            <div className="model-procurar-topicos-pesquisa-icon">
                                <AiOutlineSearch/>
                            </div>
                            <input type="text" placeholder="Procurar autor" />
                        </div>

                        {carregandoAssunto?(
                            <>

                            <div className="model-procurar-topicos-container">
                                    {todosAssuntos.map((item) => (
                                        <div className="model-procurar-topicos-container-nomes">
                                            <h3 onClick={() => adicionarAssuntos(item.nome)}>{item.nome}</h3>
                                        </div>
                                    ))}
                                
                            </div>
                            </>
                        ):(
                            <>
                                <p>Carregando...</p>
                            </>
                        )}
                        
                    </div>
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

                            <div className="main-cadastrar-obras-container-formulario-esquerda-data">
                                <p>Data da obra</p>
                                <input type="text" value={dataCricao} onChange={(e) => setData(e.target.value)}/>

                            </div>

                            <div className="main-cadastrar-obras-container-formulario-esquerda-link">
                                <p>Link</p>
                                <div className="main-cadastrar-obras-container-formulario-esquerda-link-input">
                                    <input type="text" value={link} onChange={(e) => setLink(e.target.value)}/>
                                    <button onClick={adicionarLinks}>+</button>
                                </div>
                                <a className="ver-links" onClick={AbrirModelLinks}>
                                    Visualizar links adicionados
                                </a>

                            </div>
                        </div>
                        <div className="main-cadastrar-obras-container-formulario-direita">

                            <div className="main-cadastrar-obras-container-formulario-direita-autores">
                                <p>Autores</p>
                                <div className="main-cadastrar-obras-container-formulario-direita-autores-input">
                                    <div className="main-cadastrar-obras-container-formulario-direita-autores-input-container" onClick={AbrirModelProcurarAutores}>
                                        {<FiChevronDown/>}
                                    </div>
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
                                <div className="main-cadastrar-obras-container-formulario-direita-autores-input-container" onClick={AbrirModelProcurarTopicos}>
                                        {<FiChevronDown/>}
                                    </div>
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
                                    <input type="text" value={imagem} onChange={(e) => setImagem(e.target.value)}/>
                                    <button onClick={adicionarImagens}>+</button>
                                </div>
                                <a className="ver-links" onClick={AbrirModelImagens}>
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