export const moneda = (valor) => {
    const valorDolar = valor ?? 0;
    return Number(valorDolar).toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    })
}
export const formatoPorcentaje = (valor) => {
    const valorDolar = valor ?? 0;
    return Number(valorDolar).toLocaleString("es-AR", {
        style: "percent",
        minimumFractionDigits: 2,
    });
};
export const filterPago =(array, pago)=>{
    try{
    const newFilter = array.filter(info => info.pago === pago);
    return newFilter;
    }catch (err) {
    throw new Error(err);
    }
}
export const filterTipo =(array, tipo)=>{
    try{
    const newFilter = array.filter(info => info.tipo === tipo);
    return newFilter;
    }catch (err) {
    throw new Error(err);
    }
}
export const filterDuo =(array, pago, tipo)=>{
    const newFilter = array.filter(info => info.pago === pago && info.tipo === tipo);
    return newFilter;
}

export const filterArray = (posicion, title, array, cantidad)=>{
    const newFilter =array.filter(info => info.title.includes(title))
    return newFilter.slice( posicion, posicion % 2 ? posicion + 1 : posicion + cantidad)
}

export const filterArrayComen = (posicion, title, array, cantidad)=>{
    const newFilter =array.filter(info => info.comentario.includes(title))
    return newFilter.slice( posicion, posicion % 2 ? posicion + 1 : posicion + cantidad)
}

export const goToPage = ( setPage, setCurrent, button, cantidad ) => {
    setPage( parseInt(button) )
    if(!cantidad) {
        setCurrent(button == 1 ? 0 : parseInt(button))
    } else {
        setCurrent(button == 1 ? 0 : parseInt(button) * cantidad - cantidad)
    }
}
export const next = ( setPage, page ,tipo, setCurrent, current, array , cantidad ) => {
    if(tipo) {
        const newFilter = array.filter(info => info.tipo.includes(tipo))
        setPage(page === Math.ceil(newFilter.length / cantidad) ? Math.ceil(newFilter.length / cantidad) : page + 1)
        if (page < Math.ceil(newFilter.length / cantidad) ) setCurrent(current + cantidad)
    } else {
        setPage(page === Math.ceil(array.length / cantidad) ? Math.ceil(array.length / cantidad) : page + 1)
        if (page < Math.ceil(array.length / cantidad) ) setCurrent(current + cantidad)
    }
    
}
export const previous= (setPage, page, setCurrent, current, cantidad) => {
    setPage(page === 1 ? 1 : page - 1)
    if (current > 0) setCurrent(current - cantidad)
}
