import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Obtener todos los gastos de la colección "gasto"
export const getGastos = async () => {
    const gastosCol = collection(db, 'gasto');
    const gastosSnapshot = await getDocs(gastosCol);
    return gastosSnapshot.docs.map(doc => doc.data());
};