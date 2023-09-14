import React from "react";
import Loading from "../components/loading";

export default function Erro() {
    return (
        <div className="container rounded-3 shadow p-2 mb-2">
        <div className="container text-center">
            <p><strong>Algo deu errado, tente novamente depois...</strong></p>
            <p>Se o erro persistir, avise à secretaria da escola.</p>
            <Loading/>
        </div>
    </div>
    )
}