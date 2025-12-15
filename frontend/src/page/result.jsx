import { Link, useLocation } from "react-router-dom"

export default function Result(){

    const location = useLocation();
    const prediction = location.state?.prediction;
    return(
        <>
            {prediction.prediksi}
            {prediction.label_prediksi}
            {prediction.probabilitas_tidak_cemas}
            {prediction.probabilitas_cemas}
            <Link to="/">balik</Link>
        </>
    )
}
