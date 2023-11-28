import React from 'react';
import './App.css'
import Bar from './components/Bar'
import { Isolicitud } from './interfaces/Isolicitud';
import { firestore } from './services/firebase';
import { collection,query, where, getDocs, orderBy } from 'firebase/firestore';
import DataTable from './components/DataTable';
import { changeDate } from './services/util';
import Filtros from './components/Filtros';


const columns: Icolumn[] = [
  { id: 'apellidos', label: 'Apellidos', minWidth: 150 },
  { id: 'nombres', label: 'Nombres', minWidth: 120 },
  { id: 'creado', label: 'Fecha', minWidth: 40 },
  { id: 'idioma', label: 'Idioma', minWidth: 25, align: 'left' },
  { id: 'nivel', label: 'Nivel', minWidth: 25, align: 'left' },
  
];

function App() 
{
    const [anno, setAnno] = React.useState<string>('')
    const [mes, setMes] = React.useState<string>('')
    const [data, setData] = React.useState<Isolicitud[]>([]);
    const [tempData, setTempData] = React.useState<Isolicitud[]>([]);
    const db = collection(firestore, 'solicitudes');
    
   
    React.useEffect(()=>{
      const getData = async()=>{
        const itemQuery =  query(db, where('estado',"==","ELABORADO"), orderBy('creado'))
        const d = await getDocs(itemQuery);
        
        setData(d.docs.map((item)=>{
            return { ...item.data(), id:item.id, creado:changeDate(item.data().creado) } as Isolicitud
        }));
        setTempData(d.docs.map((item)=>{
          return { ...item.data(), id:item.id, creado:changeDate(item.data().creado) } as Isolicitud
      }));
      }
      getData()
    }
    ,[])

    return (
      <>
        <Bar />
        { data && (
          <div>
            <Filtros anno={anno} mes={mes} setAnno={setAnno} setMes={setMes} data={tempData} setData={setTempData} aux={data}/>
            <DataTable columns={columns} rows={tempData} />
          </div>
        )}
      </>
    )
}

export default App
