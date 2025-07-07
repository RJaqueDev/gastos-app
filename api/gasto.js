import axios from 'axios';

//Importacion de la ruta de API
const API_URL = process.env.API_URL || 'http://localhost:3000';

// Obtener todos los gastos de la colección "gasto"
export const getGastos = async () => {
    try {
        const token = process.env.API_TOKEN;
        const response = await axios.get(`${API_URL}/api/gastos`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data; 
    } catch (error) {
        console.error('Error al obtener los gastos:', error);
        throw error; 
    }
};

//Agregar un gastos
export const addGasto = async ({monto, descripcion, coutizado, cantidad}) => {

    //TODO: Agregar validacion de id de usuario
    //TODO: Agregar validacion de id de categoria        
    //TODO: Agregar validacion cantidad cuotas       
    idUsuario = 1;
    idCategoria = 1;

    if(coutizado == false){
        coutizado = 0;
    }else{
        coutizado = 1;
    }

    console.log('Agregando gasto:', {monto, descripcion, coutizado, idCategoria, idCategoria, cantidad} )

    try {
        const token = process.env.API_TOKEN;
        const response = await axios.post(`${API_URL}/api/gastos/insertarGasto`, {
            monto,
            descripcion,
            tieneCouta : coutizado,
            cantidadCuota: cantidad,
            idUsuario,
            idCategoria
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; 
    } catch (error) {
        console.error('Error al agregar el gasto:', error);
        throw error; 
    }
}