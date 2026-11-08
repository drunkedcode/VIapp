import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { subscribeLoading } from "./loadingStore";
/**
 * GlobalLoadingOverlay adaptado para la PWA (React Router + Axios).
 * Escucha los cambios del store global controlado por el interceptor de Axios.
 */
export function GlobalLoadingOverlay() {
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState();
    useEffect(() => {
        // Se suscribe al store que enciende/apaga el loading desde Axios o llamadas manuales
        const unsubscribe = subscribeLoading((v, l) => {
            setVisible(v);
            setLabel(l);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return <Loading visible={visible} label={label}/>;
}
