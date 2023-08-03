import { useEffect, useState } from "react"
import Header from "../../Components/Header"
import './style.css'
import { api } from "../../Services/API"
import {FaPlus, FaPenAlt, FaTrashAlt} from 'react-icons/fa'
import { Mensagem } from "../../Components/Mensagem"
import { CircularProgress } from "@mui/material"
import {AiOutlineSearch} from 'react-icons/ai'
import { pegarIdUsuario } from '../../Services/localstorage';


import fundo_deletar from '../../Images/fundo_deletar.svg'

export const CadastrarObras = () => {

    const [mensagemAviso, setMensagemAviso] = useState('')
    const [tipo,setTipo] = useState('')
    const [modelCadastrar, setModelCadastrar] = useState(false)
    const [modelDeletar, setModelDeletar] = useState(false)
    const [opcao, setOpcao] = useState(false)
    const [titulo, setTitulo] = useState('')
    const [autores, setAutores] = useState('')
    const [resumo, setResumo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [link, setLink] = useState('')
    const [Carregando, setCarregando] = useState(false)
    const [Obras, setObras] = useState('')
    const [pesquisaObra, setPesquisaObra] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [tituloPesquisa, setTituloPesquisa] = useState('')
    const [mostrarAutoes, setMostrarAutoes] = useState('')
    const [carregandoAutores, setCarregandoAutores] = useState('')
    const [modelCadastrarAutores, setModelCadastrarAutores] = useState(false)
    const [mainCadastrar, setMainCadastrar] = useState('main-cadastrar-obras-opcoes')
    const [nomeAutor, setNomeAutor] = useState('')

    const cadastrarAutores = async () => {
        const data = {
            nome:nomeAutor
        }

        try {
            
            const res = await api.post('/cadastro_autor', data)
            console.log(res.data)
            setNomeAutor('')

        } catch (error) {
            console.log(error)
        }
    }

    const abrirModelCadastrarAutores = () => {
        if(modelCadastrarAutores){
            setModelCadastrarAutores(false)
            setMainCadastrar('main-cadastrar-obras-opcoes')
            
        }else{
            setModelCadastrarAutores(true)
            
            setMainCadastrar('main-cadastrar-obras-opcoes opaco')
        }
    }

    const pegandoAutores = async () => {
        try {

            const res = await api.get("/mostrar_todos_autores")
            setMostrarAutoes(res.data)
            setCarregandoAutores(true)

        } catch (error) {
            console.log(error)
        }
    }

    const pesquisarObraTitulo = async () =>{
        // if (pesquisa) {
        //     setPesquisa('')
        // }
        const titulo = tituloPesquisa

        try{
            const res = await api.post("/pesquisar_nome_obra", {titulo})

            if (res.data.mensagem === 'Obra(s) não encontrado(s)') {
                setPesquisaObra(false)
                
              } else {
                setPesquisa(res.data)
                setPesquisaObra(true)
              }


            

        }catch(err){
            console.log(err)
        }

    }

    const pegarObras = async () => {
        try {
            
            const res = await api.get("/mostrar_todas_obras")
            setObras(res.data)
            setCarregando(true)
            
        }
        catch (erro){
            console.log(erro)
        }
    }

    const abrirModelDeletar = () =>{
        if(modelDeletar){
            setModelDeletar(false)
            setOpcao(false)
            
        }else{
            setModelDeletar(true)
            setOpcao(true)
            setModelCadastrar(false)
        }
    }

    const abrirModelCadastrar = () =>{
        if(modelCadastrar){
            setModelCadastrar(false)
            setOpcao(false)
        }else{
            setModelCadastrar(true)
            setOpcao(true)
            setModelDeletar(false)
        }
    }

    const adicionarObras = async () => {

        const usuario = pegarIdUsuario()
        console.log(usuario)

        const data = {
            titulo,
            descricao,
            resumo,
            link,
            usuario,
            autor: [autores]
        }

        console.log(data)

        try{
            if(mensagemAviso){
                setTipo('')
                setMensagemAviso('')
            }
            const res = await api.post('/cadastro_obras', data)
            if(res.data.status === 400){
                setTipo('erro')
                setMensagemAviso(res.data.Mensagem)
            }else{
                setTipo('sucesso')
                setMensagemAviso(res.data.Mensagem)
                setAutores('')
                setDescricao('')
                setResumo('')
                setTitulo('')
            }
        }catch(err){
            console.log(err)
        }
    }

    const deletarObras = async (id) => {
        console.log(id)

        try {
            const res = await api.delete('/excluir_obra/' + id)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
        
    }

    useEffect(() =>{
        pegarObras()

    }, [Obras])

    useEffect(() => {
        pegandoAutores()
    }, [nomeAutor])
    
    useEffect(() => {
        pesquisarObraTitulo()
    }, [tituloPesquisa, Obras])

    return(
        <div>
            <Header/>
            <main className='main-cadastrar-obras'>

                <section className="main-cadastrar-obras-funcoes">
                    <div className="main-cadastrar-obras-funcoes-botoes">
                        <div className="editar">
                            <FaPenAlt/>
                            <h3>Editar obra</h3>
                        </div>
                        <div className="publicar" onClick={abrirModelCadastrar}>
                            <FaPlus/>
                            <h3>Publicar obra</h3>
                        </div>
                        <div className="deletar" onClick={abrirModelDeletar}>
                            <FaTrashAlt/>
                            <h3>Deletar obra</h3>
                        </div>
                    </div>
                </section>
                <section className={mainCadastrar}>

                {modelCadastrarAutores&&(
                    <div className="cadastrar-autores">
                        <div className="cadastrar-autores-titulo">
                            <h3>Cadastrar Autor</h3>
                            <h1 onClick={abrirModelCadastrarAutores}>X</h1>
                        </div>

                        <div className="cadastrar-autores-input">
                            <p>Nome:</p>
                            <input type="text" value={nomeAutor} onChange={(e) => setNomeAutor(e.target.value)}/>
                        </div>

                        <div className="cadastrar-autores-msg">

                        </div>

                        <div className="cadastrar-autores-btn">
                            <button onClick={cadastrarAutores}>Cadastrar</button>
                        </div>
                    </div>
                )}
                {opcao === true?(
                        <>
                            {modelCadastrar&&
                                <>
                              
                                    <div className="main-cadastrar-obras-publicar-itens">
                                        <div className="main-cadastrar-obras-publicar-itens-titulo">
                                            <h2>Publicar Obras</h2>

                                            <button onClick={adicionarObras}><FaPlus/></button>
                                        </div>
                                        <div className="main-cadastrar-obras-publicar-itens-mensagem">
                                            {mensagemAviso&&
                                                <Mensagem tipo={tipo} msg={mensagemAviso}/>
                                            }
                                        </div>
                                        <div className="main-cadastrar-obras-publicar-itens-titulo-obra">
                                            <h3>Titulo:</h3>
                                            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}></input>
                                        </div>
                                        <div className="main-cadastrar-obras-publicar-itens-autores">
                                            <h3>Autores:</h3>
                                            <select onChange={e => setAutores(e.target.value)} value={autores}>
                                                <option value='none'></option>
                                                {carregandoAutores?(
                                                    <>
                                                    {mostrarAutoes.map((item) => (
                                                        <option value={item.nome} >
                                                            {item.nome}
                                                        </option>
                                                    ))}
                                                    </>
                                                ):(
                                                    <p>Carregando</p>
                                                )}

                                            </select>

                                            <button onClick={abrirModelCadastrarAutores}>+</button>
                                        </div>

                                        

                                        <div className="main-cadastrar-obras-publicar-itens-resumo">
                                            <h3>Resumo:</h3>
                                            <textarea value={resumo} type="text" wrap="soft" onChange={(e) => setResumo(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="main-cadastrar-obras-publicar-itens">
                                        <div className="main-cadastrar-obras-publicar-itens-descricao">
                                            <h3>Descrição:</h3>
                                            <textarea value={descricao} type="text" wrap="soft" onChange={(e) => setDescricao(e.target.value)}/>
                                        </div>

                                        <div className="main-cadastrar-obras-publicar-itens-titulo-obra">
                                            <h3>Link:</h3>
                                            <input type="text" value={link} onChange={(e) => setLink(e.target.value)}></input>
                                        </div>
                                    </div>
                                </>
                            }
                            {modelDeletar&&
                                <>
                                <div className="main-cadastrar-obras-deletar">
                                    <div className="main-cadastrar-obras-deletar-conteudo">
                                        <div className="main-cadastrar-obras-deletar-conteudo-pesquisa">
                                            <div className="main-cadastrar-obras-deletar-conteudo-pesquisa-btn">
                                                <AiOutlineSearch className='containerUsuario-pesquisa-barra-loupe' onClick={pesquisarObraTitulo}/>
                                            </div>
                                            <div className="main-cadastrar-obras-deletar-conteudo-pesquisa-input">
                                                <input type="text" placeholder="Digite o titulo da obra " onChange={(e) => setTituloPesquisa(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="main-cadastrar-obras-deletar-conteudo-obras">
                                            {pesquisaObra === false?(
                                                <>
                                                    <h3>Pesquise por uma obra</h3>
                                                    <img src={fundo_deletar} alt="esperando" />
                                                </>
                                            ):(
                                                pesquisa.map((item) =>(
                                                    <div className="main-cadastrar-obras-deletar-conteudo-obras-caixa">
                                                        <div className="main-cadastrar-obras-deletar-conteudo-obras-caixa-titulo">
                                                            <h3>Titulo: {item.titulo}</h3>
                                                            <h3>Autores: {item.autores}</h3>
                                                            <FaTrashAlt onClick={() => {deletarObras(item.id_obra)}}/>
                                                        </div>
                                                        <div className="main-cadastrar-obras-deletar-conteudo-obras-caixa-resumo">
                                                            <h3>Resumo:</h3>
                                                            <p>{item.resumo}</p>
                                                        </div>
                                                        
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                    <div className="main-cadastrar-obras-deletar-container">
                                        <div className="cadastrar-obras-deletar-container-lista-bloco">
                                            <div className="main-cadastrar-obras-deletar-container-titulo">
                                                <h1>Obras</h1>
                                            </div>
                                            <div className="main-cadastrar-obras-deletar-container-lista">
            
                                                    {Carregando===true?(
                                                        
                                                        Obras.map((itens, index) => (
                                                            <>
                                                                <div  className="main-cadastrar-obras-deletar-container-lista-bloco-titulo">
                                                                    <h3> {itens.titulo}</h3>
                                                                </div>
                                                            </>
                                                        ))
                                                    ):(
                                                        <CircularProgress></CircularProgress>
                                                    )} 
                                                </div>
                                        </div>
                
                                    </div>

                                </div>
                                </>
                            }
                        </>
                    ):(
                        <div className="main-cadastrar-obras-funcoes-vazio">

                        </div>
                    )}
                </section>
                
            </main>

        </div>
    )
}