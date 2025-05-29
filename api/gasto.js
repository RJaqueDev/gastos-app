import { db } from '../config/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

// Obtener todos los gastos de la colección "gasto"
export const getGastos = async () => {
    const gastosCol = collection(db, 'gasto');
    const gastosSnapshot = await getDocs(gastosCol);
    return gastosSnapshot.docs.map(doc => doc.data());
};

// Crear un nuevo gasto en la colección "gasto"
export const addGasto = async ({ monto, descripcion, cuotizado }) => {
    const gastosCol = collection(db, 'gasto');
    const docRef = await addDoc(gastosCol, {
        monto: Number(monto),
        descripcion,
        cuotizado: Boolean(cuotizado),
        fecha: new Date().toISOString()
    });
    return docRef;
};