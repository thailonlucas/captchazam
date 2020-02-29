import React, {useState, useEffect} from 'react'
import './style.scss'
import ReactLoading from 'react-loading';

const CaptchaSelector = props => {
    const {data, children, maxPerPage, onSelect, onSend, title, subtitle, loading} = props
    const [showData, setShowData] = useState([])
    const [pageSize, setPageSize] = useState(maxPerPage || 9)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(()=>{
        getNextShowData()
    }, [data])

    const getNextShowData = () =>{
       // if(!data || data.length == 0) return 
        setShowData(data)
        setCurrentIndex(currentIndex+pageSize)
    }

    const onSelectHandle = (item) => {
        if(onSelect) onSelect(item)
    }

    const onSendHandle = () =>{
        if(onSend) return onSend(showData, getNextShowData)
    }

    return (
        <div id='capcthaSelector'>
            <header>
                <h2>{title}</h2>
                <h1>{subtitle}</h1>
            </header>
            <main>
                <ul>
                    {loading && <div className='loading-container'><ReactLoading type="bubbles" color='#00AAFF'/></div>}
                    {(!showData || showData.length == 0) && <h1 className='empty-message'>Nenhum conteúdo a ser mostrado</h1>}
                   {showData && showData.map((item, idx)=><ImageOption item={item} {...item} key={idx} onClick={onSelectHandle}/>)}
                </ul>
            </main>
            <footer>
                {children}
               <div className='send'onClick={onSendHandle}><h1>{loading ? "Aguarde" : "Enviar"}</h1></div>
            </footer>
        </div>
    )
}

const ImageOption = props =>{
    const [selected, setSelected] = useState(false)

    const {src, onClick, label, item} = props

    useEffect(()=>{
        setSelected(false)
    }, [src])

    const onClickHandle = item => {
        item['selected'] = !selected
        setSelected(!selected)
        if(onClick) onClick(item)
    }

    return(
        <li onClick={()=>onClickHandle(item)} className={selected ? 'selected' : ''}>
            {label && <h1>{label}</h1>}
            <img src={src} />
        </li>
    )
}

export default CaptchaSelector
