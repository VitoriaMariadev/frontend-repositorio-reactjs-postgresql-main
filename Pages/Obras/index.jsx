import {AiOutlineSearch} from 'react-icons/ai'
import './style.css'
import { api } from '../../Services/API'
import { useState, useEffect, useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Components/Header';
import { Enfeite } from '../../Components/Enfeite';
import {BsFilter} from 'react-icons/bs'
import {ImRadioChecked, ImRadioUnchecked} from 'react-icons/im'

export const Obras = () => {
    const containerObras = useRef(null)
    const containerTodasObras = useRef(null)
    const [carregando, setCarregando] = useState(false)
    const [pegarObras, setPegarObras] = useState('')
    const [pegarObraId, setPegarObraId] = useState('')
    const [carregandoId, setCarregandoId] = useState(false)
    const [titulo, setTitulo] = useState('')
    const [pesquisarTitulo, setPesquisarTitulo] = useState('')
    const [obraNaoEncontrada, setObraNaoEncontrada] = useState(false)
    const [modelFiltro, setModelFiltro] = useState(false)
    const [obrasRecentesSvg, setObrasRecentesSvg] = useState(<ImRadioUnchecked/>)
    const [obrasRecentes, setObrasRecentes] = useState(false)
    const [obrasAntigas, setObrasAntigas] = useState(false)
    const [obrasAntigasSvg, setObrasAntigasSvg] = useState(<ImRadioUnchecked/>)
    const [todosOsAutores, setTodosOsAutores] = useState(false)
    const [todosOsAutoresSvg, setTodosOsAutoresSvg] = useState(<ImRadioUnchecked/>)
    const [capistranoAbreu, setCapistranoAbreu] = useState(false)
    const [capistranoAbreuSvg, setCapistranoAbreuSvg] = useState(<ImRadioUnchecked/>)
    const [buscarAutor, setBuscarAutor] = useState('')
    const [buscarPorAutor, setBuscarPorAutor] = useState(false)
    const [buscarPorAutorSvg, setBuscarPorAutorSvg] = useState(<ImRadioUnchecked/>)
    const [ordemAlfabetica, setOrdemAlfabetica] = useState(false)
    const [ordemAlfabeticaSvg, setOrdemAlfabeticaSvg] = useState(<ImRadioUnchecked/>)
    const [ordemAleatoria, setOrdemAleatoria] = useState(false)
    const [ordemAleatoriaSvg, setOrdemAleatoriaSvg] = useState(<ImRadioUnchecked/>)
    const [obrasAntigasCriacaoSvg, setObrasAntigasCriacaoSvg] = useState(<ImRadioUnchecked/>)
    const [obrasAntigasCriacao, setObrasAntigasCriacao] = useState(false)
    const [obrasRecentesCriacaoSvg, sestObrasRecentesCriacaoSvg] = useState(<ImRadioUnchecked/>) 
    const [obrasRecentesCriacao, sestObrasRecentesCriacao] = useState(false) 
    const [todosAssuntos, setTodosAssuntos] = useState('')
    const [carregandoAssunto, setCarregandoAssunto] = useState(false)

    // Ativar filtro

    const ativarObrasRecentes = () => {
        if(obrasRecentes){
            setObrasRecentes(false)
            setObrasRecentesSvg(<ImRadioUnchecked/>)
        }else{
            pesquisarPorMaisRecente()
            setObrasRecentes(true)
            setObrasAntigas(false)
            setObrasAntigasSvg(<ImRadioUnchecked/>)
            setObrasRecentesSvg(<ImRadioChecked/>)
            setTodosOsAutores(false)
            setTodosOsAutoresSvg(<ImRadioUnchecked/>)
            setCapistranoAbreu(false)
            setCapistranoAbreuSvg(<ImRadioUnchecked/>)
            setBuscarPorAutor(false)
            setBuscarPorAutorSvg(<ImRadioUnchecked/>)
            setOrdemAlfabetica(false)
            setOrdemAlfabeticaSvg(<ImRadioUnchecked/>)
            setOrdemAleatoria(false)
            setOrdemAleatoriaSvg(<ImRadioUnchecked/>)
            setObrasAntigasCriacao(false)
            setObrasAntigasCriacaoSvg(<ImRadioUnchecked/>)
            sestObrasRecentesCriacao(false)
            sestObrasRecentesCriacaoSvg(<ImRadioUnchecked/>)
        }
    }

    const ativarObrasAntigas = () =>{
        if(obrasAntigas){
            setObrasAntigas(false)
            setObrasAntigasSvg(<ImRadioUnchecked/>)
        }else{
            pesquisarPorMaisAntiga()
            setObrasAntigas(true)
            setObrasRecentes(false)
            setObrasAntigasSvg(<ImRadioChecked/>)
            setObrasRecentesSvg(<ImRadioUnchecked/>)
            setTodosOsAutores(false)
            setTodosOsAutoresSvg(<ImRadioUnchecked/>)
            setCapistranoAbreu(false)
            setCapistranoAbreuSvg(<ImRadioUnchecked/>)
            setBuscarPorAutor(false)
            setBuscarPorAutorSvg(<ImRadioUnchecked/>)
            setOrdemAlfabetica(false)
            setOrdemAlfabeticaSvg(<ImRadioUnchecked/>)
            setOrdemAleatoria(false)
            setOrdemAleatoriaSvg(<ImRadioUnchecked/>)
            setObrasAntigasCriacao(false)
            setObrasAntigasCriacaoSvg(<ImRadioUnchecked/>)
            sestObrasRecentesCriacao(false)
            sestObrasRecentesCriacaoSvg(<ImRadioUnchecked/>)
        }
    }

    const ativarTodosOsAutores = () => {
        if(todosOsAutores){
            setTodosOsAutores(false)
            setTodosOsAutoresSvg(<ImRadioUnchecked/>)
        }else{
            pesquisarTodosOutrosAutores()
            setTodosOsAutores(true)
            setTodosOsAutoresSvg(<ImRadioChecked/>)
            setObrasRecentes(false)
            setObrasRecentesSvg(<ImRadioUnchecked/>)
            setObrasAntigas(false)
            setObrasAntigasSvg(<ImRadioUnchecked/>)
            setCapistranoAbreu(false)
            setCapistranoAbreuSvg(<ImRadioUnchecked/>)
            setBuscarPorAutor(false)
            setBuscarPorAutorSvg(<ImRadioUnchecked/>)
            setOrdemAlfabetica(false)
            setOrdemAlfabeticaSvg(<ImRadioUnchecked/>)
            setOrdemAleatoria(false)
            setOrdemAleatoriaSvg(<ImRadioUnchecked/>)
            setObrasAntigasCriacao(false)
            setObrasAntigasCriacaoSvg(<ImRadioUnchecked/>)
            sestObrasRecentesCriacao(false)
            sestObrasRecentesCriacaoSvg(<ImRadioUnchecked/>)
        }
    }

    const ativarCapistrano = () => {
        if(capistranoAbreu){
            setCapistranoAbreu(false)
            setCapistranoAbreuSvg(<ImRadioUnchecked/>)
        }else{
            pesquisarTodosCapistrano()
            setCapistranoAbreu(true)
            setCapistranoAbreuSvg(<ImRadioChecked/>)
            setTodosOsAutores(false)
            setTodosOsAutoresSvg(<ImRadioUnchecked/>)
            setObrasRecentes(false)
            setObrasRecentesSvg(<ImRadioUnchecked/>)
            setObrasAntigas(false)
            setObrasAntigasSvg(<ImRadioUnchecked/>)
            setBuscarPorAutor(false)
            setBuscarPorAutorSvg(<ImRadioUnchecked/>)
            setOrdemAlfabetica(false)
            setOrdemAlfabeticaSvg(<ImRadioUnchecked/>)
            setOrdemAleatoria(false)
            setOrdemAleatoriaSvg(<ImRadioUnchecked/>)
            setObrasAntigasCriacao(false)
            setObrasAntigasCriacaoSvg(<ImRadioUnchecked/>)
            sestObrasRecentesCriacao(false)
            sestObrasRecentesCriacaoSvg(<ImRadioUnchecked/>)

        }
    }

    const ativarBuscarAutor = () => {
        if(buscarPorAutor){
            setBuscarPorAutor(false)
            setBuscarPorAutorSvg(<ImRadioUnchecked/>)
        }else{
            
            setBuscarPorAutor(true)
            setBuscarPorAutorSvg(<ImRadioChecked/>)
            setCapistranoAbreu(false)
            setCapistranoAbreuSvg(<ImRadioUnchecked/>)
            setTodosOsAutores(false)
            setTodosOsAutoresSvg(<ImRadioUnchecked/>)
            setObrasRecentes(false)
            setObrasRecentesSvg(<ImRadioUnchecked/>)
            setObrasAntigas(false)
            setObrasAntigasSvg(<ImRadioUnchecked/>)
            setOrdemAlfabetica(false)
            setOrdemAlfabeticaSvg(<ImRadioUnchecked/>)
            setOrdemAleatoria(false)
            setOrdemAleatoriaSvg(<ImRadioUnchecked/>)
            setObrasAntigasCriacao(false)
            setObrasAntigasCriacaoSvg(<ImRadioUnchecked/>)
            sestObrasRecentesCriacao(false)
            sestObrasRecentesCriacaoSvg(<ImRadioUnchecked/>)
        }
    }

    const ativarOrdemAlfabetica = () => {
        if(ordemAlfabetica){
            setOrdemAlfabetica(false)
            setOrdemAlfabeticaSvg(<ImRadioUnchecked/>)
        }else{
            pesquisaPorOrdemAlfabetica()
            setOrdemAlfabetica(true)
            setOrdemAlfabeticaSvg(<ImRadioChecked/>)
            setBuscarPorAutor(false)
            setBuscarPorAutorSvg(<ImRadioUnchecked/>)
            setCapistranoAbreu(false)
            setCapistranoAbreuSvg(<ImRadioUnchecked/>)
            setTodosOsAutores(false)
            setTodosOsAutoresSvg(<ImRadioUnchecked/>)
            setObrasRecentes(false)
            setObrasRecentesSvg(<ImRadioUnchecked/>)
            setObrasAntigas(false)
            setObrasAntigasSvg(<ImRadioUnchecked/>)
            setOrdemAleatoria(false)
            setOrdemAleatoriaSvg(<ImRadioUnchecked/>)
            setObrasAntigasCriacao(false)
            setObrasAntigasCriacaoSvg(<ImRadioUnchecked/>)
            sestObrasRecentesCriacao(false)
            sestObrasRecentesCriacaoSvg(<ImRadioUnchecked/>)
        }
    }

    const ativarOrdemAleatoria = () => {
        if(ordemAleatoria){
            setOrdemAleatoria(false)
            setOrdemAleatoriaSvg(<ImRadioUnchecked/>)
        }else{
            pesquisarPorOrdemAleatoria()
            setOrdemAleatoria(true)
            setOrdemAleatoriaSvg(<ImRadioChecked/>)
            setOrdemAlfabetica(false)
            setOrdemAlfabeticaSvg(<ImRadioUnchecked/>)
            setBuscarPorAutor(false)
            setBuscarPorAutorSvg(<ImRadioUnchecked/>)
            setCapistranoAbreu(false)
            setCapistranoAbreuSvg(<ImRadioUnchecked/>)
            setTodosOsAutores(false)
            setTodosOsAutoresSvg(<ImRadioUnchecked/>)
            setObrasRecentes(false)
            setObrasRecentesSvg(<ImRadioUnchecked/>)
            setObrasAntigas(false)
            setObrasAntigasSvg(<ImRadioUnchecked/>)
            setObrasAntigasCriacao(false)
            setObrasAntigasCriacaoSvg(<ImRadioUnchecked/>)
            sestObrasRecentesCriacao(false)
            sestObrasRecentesCriacaoSvg(<ImRadioUnchecked/>) 
        }
    }

    const ativarObrasAntigasCriacao = () => {
        if(obrasAntigasCriacao){
            setObrasAntigasCriacao(false)
            setObrasAntigasCriacaoSvg(<ImRadioUnchecked/>)
        }else{
            pesquisarPorMaisAntigaCriacao()
            setObrasAntigasCriacao(true)
            setObrasAntigasCriacaoSvg(<ImRadioChecked/>)
            setOrdemAleatoria(false)
            setOrdemAleatoriaSvg(<ImRadioUnchecked/>)
            setOrdemAlfabetica(false)
            setOrdemAlfabeticaSvg(<ImRadioUnchecked/>)
            setBuscarPorAutor(false)
            setBuscarPorAutorSvg(<ImRadioUnchecked/>)
            setCapistranoAbreu(false)
            setCapistranoAbreuSvg(<ImRadioUnchecked/>)
            setTodosOsAutores(false)
            setTodosOsAutoresSvg(<ImRadioUnchecked/>)
            setObrasRecentes(false)
            setObrasRecentesSvg(<ImRadioUnchecked/>)
            setObrasAntigas(false)
            setObrasAntigasSvg(<ImRadioUnchecked/>)
            sestObrasRecentesCriacao(false)
            sestObrasRecentesCriacaoSvg(<ImRadioUnchecked/>) 
        }
    }

    const ativarObrasRecentesCriacao = () => {
        if(obrasRecentesCriacao){
            sestObrasRecentesCriacao(false)
            sestObrasRecentesCriacaoSvg(<ImRadioUnchecked/>)
        }else{
            pesquisarPorMaisRecenteCriacao()
            sestObrasRecentesCriacao(true)
            sestObrasRecentesCriacaoSvg(<ImRadioChecked/>) 
            setOrdemAleatoria(false)
            setOrdemAleatoriaSvg(<ImRadioUnchecked/>)
            setOrdemAlfabetica(false)
            setOrdemAlfabeticaSvg(<ImRadioUnchecked/>)
            setBuscarPorAutor(false)
            setBuscarPorAutorSvg(<ImRadioUnchecked/>)
            setCapistranoAbreu(false)
            setCapistranoAbreuSvg(<ImRadioUnchecked/>)
            setTodosOsAutores(false)
            setTodosOsAutoresSvg(<ImRadioUnchecked/>)
            setObrasRecentes(false)
            setObrasRecentesSvg(<ImRadioUnchecked/>)
            setObrasAntigas(false)
            setObrasAntigasSvg(<ImRadioUnchecked/>)       
            setObrasAntigasCriacao(false)
            setObrasAntigasCriacaoSvg(<ImRadioUnchecked/>)
        }
    }

    // Pegar Obras Por Id

    const pesquisarPorMaisAntigaCriacao = async () => {
        try {
            const res = await api.get('/mostrar_obras_criadas_antigas')
            setCarregando(true)
            setPegarObras(res.data)
            setModelFiltro(false)
            containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.log(error)
        }
    }

    const pesquisarPorMaisRecenteCriacao = async () => {
        try {
            const res = await api.get('/mostrar_obras_criadas_recentes')
            setCarregando(true)
            setPegarObras(res.data)
            setModelFiltro(false)
            containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.log(error)
        }
    }

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
            containerObras.current.scrollTo({ top: 0, behavior: 'smooth' })
            console.log(res.data)

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

    // Pegar assuntos
    const pegarAssuntos = async () => {
        try {

            const res = await api.post('/mostrar_assuntos')
            if (res.data.status === 400){
                setCarregandoAssunto(false)
            }else{
                setTodosAssuntos(res.data)
                setCarregandoAssunto(true)
            }
            

            
        } catch (error) {
            console.log(error)
        }
    }

    // Pesquisar Por

    const pesquisarPorAssunto = async (nome) => {

        const data = {
            assunto:nome
        }

        try {

            const res = await api.post('/mostrar_todas_obras_assunto', data)
            setCarregando(true)
            setPegarObras(res.data)
            setModelFiltro(false)
            containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })
            console.log(res.data)
    
        } catch (error) {
            console.log(error)
        }

    }

    const pesquisarPorMaisRecente = async () => {
        try {
            const res = await api.get('/mostrar_obras_recentes')
            setCarregando(true)
            setPegarObras(res.data)
            setModelFiltro(false)
            containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const pesquisarPorMaisAntiga = async () => {
        try {
            const res = await api.get('/mostrar_obras_antigas')
            setCarregando(true)
            setPegarObras(res.data)
            setModelFiltro(false)
            containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.log(error)
        }
    }

    const pesquisaPorOrdemAlfabetica = async () => {
        try {
            const res = await api.get('/mostrar_ordem_alfabetica')

            setCarregando(true)
            setPegarObras(res.data)
            setModelFiltro(false)
            containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.log(error)
        }
    }

    const pesquisarTodosCapistrano = async () => {
        try {
            const res = await api.get('/mostrar_todas_capistrano')

            if(res.data.status === 400){
                setCarregando(false)
                setModelFiltro(false)
            }else{

                setCarregando(true)
                setPegarObras(res.data)
                
                containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pesquisarTodosOutrosAutores = async () => {
        try {
            const res = await api.get('/mostrar_outras_obras')
            setCarregando(true)
            setPegarObras(res.data)
            setModelFiltro(false)
            containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.log(error)
        }
    }

    const pesquisarPorNomeAutor = async () => {
        const data = {
            nome:buscarAutor
        }

        try {
            const res = await api.post('/pesquisar_nome_autor', data)

            if (res.data.status == 400){
                setModelFiltro(false)
                setCarregando(false)
            }else{
                setCarregando(true)
                setPegarObras(res.data)
                setModelFiltro(false)
                containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })

            }
        } catch (error) {
            console.log(error)
        }

    }

    const pesquisarPorNomeAutorTopico = async (AutorTopico) => {
        const data = {
            nome:AutorTopico
        }

        try {
            const res = await api.post('/pesquisar_nome_autor', data)

            if (res.data.status == 400){
                setModelFiltro(false)
                setCarregando(false)
            }else{
                setCarregando(true)
                setPegarObras(res.data)
                setModelFiltro(false)
                containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })

            }
        } catch (error) {
            console.log(error)
        }

    }

    const pesquisarPorOrdemAleatoria = async () => {

        try {
            const res = await api.get('/mostrar_obras_aleatorio')
            setCarregando(true)
            setPegarObras(res.data)
            setModelFiltro(false)
            containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.log(error)
        }

    }

    const pesquisarPorIdUsuario = async (id) => {

        try {
            const res = await api.get("/mostrar_obras_id_usuario/" + id)
            setCarregando(true)
            setPegarObras(res.data)
            containerTodasObras.current.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            console.log(error)
        }



    }

    
    useEffect(() => {
        pesquisarObraPorNome()
    }, [pesquisarTitulo])

    useEffect(() => {
        pegarAssuntos()
        
    },[])

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
                                <div className="main-obras-todas-container-mostrar-container-obras" ref={containerTodasObras}>
                                    {modelFiltro?(
                                        <>
                                        
                                            <h2 className='filtros'>FILTROS</h2>
                                            <div className="main-obras-todas-container-mostrar-container-obras-classificacao">
                                                <p>Data de publicação</p>
                                                <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes">
                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-recentes check-box" onClick={ativarObrasRecentes}>
                                                        {obrasRecentesSvg}
                                                        <p>Obras recentes</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-antigas check-box" onClick={ativarObrasAntigas}>
                                                        {obrasAntigasSvg}
                                                        <p>Obras antigas</p>
                                                    </div>
                                                </div>

                                                
                                            </div>

                                            <div className="main-obras-todas-container-mostrar-container-obras-classificacao">
                                                <p>Data de criação</p>
                                                <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes">
                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-recentes check-box" onClick={ativarObrasRecentesCriacao}>
                                                        {obrasRecentesCriacaoSvg}
                                                        <p>Obras recentes</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-antigas check-box" onClick={ativarObrasAntigasCriacao}>
                                                        {obrasAntigasCriacaoSvg}
                                                        <p>Obras antigas</p>
                                                    </div>
                                                </div>

                                                
                                            </div>

                                            <div className="main-obras-todas-container-mostrar-container-obras-autores">
                                                <p>Autores</p>
                                                <div className="main-obras-todas-container-mostrar-container-obras-autores-opcoes">
                                                    <div className="main-obras-todas-container-mostrar-container-obras-autores-opcoes-todos-autores check-box" onClick={ativarTodosOsAutores}>
                                                        {todosOsAutoresSvg}
                                                        <p>Todos os autores</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-autores-opcoes-capistrano check-box" onClick={ativarCapistrano}>
                                                        {capistranoAbreuSvg}
                                                        <p>Capistrano de Abreu</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-autores-opcoes-pesquisar check-box" onClick={ativarBuscarAutor}>
                                                        {buscarPorAutorSvg}
                                                        <div className="main-obras-todas-container-mostrar-container-obras-autores-opcoes-pesquisar-input">
                                                            <input type="text" placeholder='Nome do autor' value={buscarAutor} onChange={(e) => setBuscarAutor(e.target.value)}/>
                                                            <button onClick={pesquisarPorNomeAutor}>Buscar</button>
                                                        </div>
                                                    </div>
                                                </div>   
                                            </div>

                                            <div className="main-obras-todas-container-mostrar-container-obras-classificacao">
                                                <p>Ordem</p>
                                                <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes">
                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-recentes check-box" onClick={ativarOrdemAlfabetica}>
                                                        {ordemAlfabeticaSvg}
                                                        <p>A - Z</p>
                                                    </div>

                                                    <div className="main-obras-todas-container-mostrar-container-obras-classificacao-opcoes-obras-antigas check-box" onClick={ativarOrdemAleatoria}>
                                                        {ordemAleatoriaSvg}
                                                        <p>Aleátoria</p>
                                                    </div>
                                                </div>   
                                            </div>

                                            <div className="main-obras-todas-container-mostrar-container-obras-topicos">
                                                <p>Tópicos</p>
                                                <ul>
                                                    {carregandoAssunto&&(
                                                        todosAssuntos.map((item) => (
                                                            <li onClick={() => pesquisarPorAssunto(item.nome)} >{item.nome}</li>
                                                        ))
                                                    )}
                                                </ul>
                                                 
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
                                                    <li onClick={() => pesquisarPorAssunto(topicos)}>{topicos}</li>
                                                ))}
                                            </ul>

                                        </div>

                                        <div className="main-obras-ver-container-mostrar-container-obra-img">
                                            {pegarObraId.imgs.split(',').map((item) => (
                                                <>   
                                                         
                                                    <img src={item} alt="imagem" />
                                                
                                                </>
                                            ))}
                                        </div>
                                        
                                        <div className="main-obras-ver-container-mostrar-container-obra-descricao">
                                            
                                            {pegarObraId.descricao.split('<br />').map((item) => (
                                                <>
                                                    
                                                    <p>{item}</p>
                                                    <br/>
                                                
                                                </>
                                            ))}
                                        </div>

                                        <div className="main-obras-ver-container-mostrar-container-obra-data-criacao">
                                            
                                            <>
                                                <h4>Data de Criação</h4>
                                                <p>{pegarObraId.data_criacao}</p>
                                            </>
                                            
                                        </div>
                                        <div className="main-obras-ver-container-mostrar-container-obra-traco">

                                        </div>
                                        <div className="main-obras-ver-container-mostrar-container-obra-liks">
                                            <h4>Fontes</h4>
                                            {pegarObraId.links.split(',').map((link) => (
                                                <a href={link} >{link}</a>
                                            ))}
                                            
                                            
                                        </div>

                                        <div className="main-obras-ver-container-mostrar-container-obra-autores">
                                            <h4>Autores</h4>

                                            <ul>
                                                {pegarObraId.autores.split(',').map((autor) => (
                                                    <>
                                                        <li onClick={() => pesquisarPorNomeAutorTopico(autor.trim())}>
                                                            {autor.trim()}
                                                        </li>
                                                    </>
                                                ))}

                                            </ul>
                                            
                                            
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
                                                <p>Publicado por <span onClick={() => pesquisarPorIdUsuario(pegarObraId.id_usuario)}>{pegarObraId.usuario}</span></p>
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