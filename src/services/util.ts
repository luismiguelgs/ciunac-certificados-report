import { Timestamp } from "firebase/firestore";

export const changeDate = (date:Timestamp):string|undefined => {
    if(date === null) return
    const fecha:Date  = date?.toDate()
    // Obtener diferentes partes de la fecha y hora
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, se suma 1
    const anio = fecha.getFullYear();
    // Formatear los valores para que tengan dos dígitos si es necesario
    const diaFormateado = String(dia).padStart(2, '0');
    const mesFormateado = String(mes).padStart(2, '0');
    // Generar la cadena con el formato deseado (por ejemplo, dd/mm/aaaa hh:mm:ss)
    const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;
    return fechaFormateada
  } 
  
  