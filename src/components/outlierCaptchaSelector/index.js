import React, {useState, useEffect} from 'react'
import { CSVReader } from 'react-papaparse'
import CaptchaSelector from '../capcthaSelector'
import { Upload } from 'react-feather';
import './style.scss'
import { getImagesAPI, getSamplesSizeAPI, setImagesOutlierAPI } from '../../api/images/imagesAPI';
import TargetView from '../targetView';

const OutlierCaptchaSelector = (props) => {
    const OPTIONS = [{id: 1, src: 'https://definicao.net/wp-content/uploads/2019/04/selfie-3-810x540.jpg'},
        {id: 2, src: 'https://travelandleisure.mx/wp-content/uploads/2018/09/turismo.jpg'},{id:3, src:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6HIWOjDM9nu5KhRxPhxYVz3wVzuGUnZVETcmblaFlXJiRrrjP'},{id: 1, src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/friendliest-dog-breeds-golden-1578596627.jpg?crop=0.668xw:1.00xh;0.188xw,0&resize=640:*'},
        {id: 2, src: 'data:image/jpeg;base64,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'},{id:3, src:'https://assets-br.wemystic.com.br/20191113010255/homem-peixes-850x640.jpg'},{id: 1, src: 'https://www.vanguardia.com/binrepository/716x477/0c0/0d0/none/12204/NXHT/web_ahogado_big_tp_VL454619_MG17930326.jpg'},
        {id: 2, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH6R0seMdKFozMIU00pDhtU4yr97S1d76Pi5NvPZ9zlb3LN4kW'},{id:3, src:'https://i1.wp.com/metro.co.uk/wp-content/uploads/2019/10/PRI_90095071.jpg?quality=90&strip=all&zoom=1&resize=644%2C483&ssl=1'}]
    const COLORS = ['#FF00AA','#AAFF00']   
    
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [samplesEvaluted, setSamplesEvaluated] = useState(0)
    const [samplesTotal, setSamplesTotal] = useState(0)
    const [readyItems, setReadyItems] = useState([])

    let fileInput

    useEffect(()=>{
        loadParams()
    }, [])

    const loadParams = () => {
        getImagesAPI().then((res)=>{
            mapImages(res.images)
        })
        getSamplesSizeAPI().then(res => {
            setSamplesEvaluated(res.evaluated)
            setSamplesTotal(res.total)
        })
    }

    const mapImages = data => {
        console.log(data)
        if(!data) return

        try{
            const mappedOptions = data.map((image, idx) => {
                return {id: idx, src: image.encoded, image: image.idx, outlier: 'NOT_EVALUATED', selected: false}
            })
            setOptions(mappedOptions)
        }catch(e){
            alert('Arquivo incompatível')
        }
    }

    const onSelectHandle = items => {
        console.log(items)
    }

    const onSendtHandle = (items, goNextPage) =>{
        if(loading) return 
        setLoading(true)
        if(items.length == 0)
            return saveProgress()
        
        let mappedItems = items.map(item=>{
            console.log(item)
            return {image:item.image, result:!item.selected ? 'INLIER' : 'OUTLIER'}
        })
        console.log(mappedItems)
        setImagesOutlierAPI({images:mappedItems}).then(res => {
            setReadyItems([...readyItems,...mappedItems])
            // goNextPage()
            loadParams()
        }).catch(e=>{
            console.error(e)
            alert('Algo deu errado. Veifique sua internet ou tente novamente mais tarde!')
        }).finally(()=>{
            setLoading(false)
        })
    }

    const saveProgress = () => {
        console.log(readyItems)
    }
    
    useEffect(()=>{
        console.log(readyItems)
    }, [readyItems])

    return (
        <div>
            <TargetView target={samplesTotal} value={samplesEvaluted}/>
            <CaptchaSelector loading={loading} data={options} sizePerPage={9} onSelect={onSelectHandle} onSend={onSendtHandle} title={'Selecione as imagens que:'} subtitle={'Não são faces'}>
                {/* <Upload size={16} color={'#fff'} onClick={()=>fileInput.click()} className='icon-button'/> */}
                <h3 className='identifieds-label'>{`${samplesEvaluted}/${samplesTotal}`}</h3>
                {/* <CSVReader
                    onFileLoaded={onFileChange}
                    inputRef={onFileChange}
                    style={{display: 'none'}}
                    inputRef={ref => fileInput = ref}
                    skipEmptyLines={true}
                    onError={()=>alert('Arquivo incompatível')}
                /> */}
            </CaptchaSelector>
        </div>
    )
}

export default OutlierCaptchaSelector
