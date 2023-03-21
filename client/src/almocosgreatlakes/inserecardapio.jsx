import React from "react";
import { useState, useEffect, useRef } from "react";
import Loading from "../components/loading";

const InsereCardapio = (props) => {
    const [loading, useLoading] = useState(true);
    const [loaded, useLoaded] = useState(false);
    const [error, useError] = useState(false);

    if (loading) {
        return (
            <Loading/>
        )
    }


}

export default InsereCardapio;