import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import { Isolicitud } from '../interfaces/Isolicitud';
import { MESES } from '../services/constantes';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

type Props = {
    anno: string,
    mes: string,
    setAnno: React.Dispatch<React.SetStateAction<string>>,
    setMes: React.Dispatch<React.SetStateAction<string>>,
    data: Isolicitud[],
    setData: React.Dispatch<React.SetStateAction<Isolicitud[]>>,
    aux: Isolicitud[]
}
type select = {
    value: string,
    label: string
}

export default function Filtros({anno, mes, setAnno, setMes, data,setData, aux}:Props) 
{
    let tempA:number = 0
    let tempM:number = 0
    let _annos:select[] = []
    let _meses:select[] = []

    const setearSelects = () =>{
        data.forEach(item=>{
            
            let _anno = item.creado?.split('/')[2]
            let _mes = item.creado?.split('/')[1]

            if(_mes !== undefined){
                if(+_mes !== tempM){
                    _meses.push({value:_mes, label:MESES[+_mes-1].label})
                    tempM = +_mes
                }
            }
            
            if(_anno !== undefined){
                if(+_anno !== tempA){
                    _annos.push({value:_anno, label:_anno.toString()})
                    tempA = +_anno
                }
            }
        })
    }

    setearSelects()

    React.useEffect(()=>{
        if(anno !== ''){
            const filtro_anno = data.filter(item => item.creado?.split('/')[2] === anno )
            setData(filtro_anno)
            setMes('')
        }
        if(mes !== ''){
            const filtro_mes = data.filter(item => item.creado?.split('/')[1] === mes )
            setData(filtro_mes)
            setMes(mes)
        }
    },[anno,mes])

    const resetFiltro = () =>{
        setData(aux)
        setAnno('')
        setMes('')
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{mb:2}}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Año</InputLabel>
                        { _annos &&
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={anno}
                            label="Año"
                            onChange={(e)=>setAnno(e.target.value)}
                        >
                            {
                                _annos.map(a=>(
                                    <MenuItem value={a.value} key={a.value}>{a.label}</MenuItem>
                                ))
                            }
                        </Select>
                        }   
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={mes}
                            disabled={anno === ''}
                            label="Mes"
                            onChange={(e)=>setMes(e.target.value)}
                        >
                            {
                                _meses.map(m=>(
                                    <MenuItem value={m.value} key={m.value}>{m.label}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Button variant="contained" endIcon={<RestartAltIcon />} fullWidth size='large' sx={{p:1.5}} onClick={()=>resetFiltro()}>
                    Resetear
                </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
