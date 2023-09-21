import React from "react";
import "./Loading.css";

function Loading() {
    const preloader: string = require("../../images/preloader.svg").default;

    return(
        <section className="preloader">
            <img src={preloader} alt="Идет загрузка страницы"/>
        </section>
    )
}

export default Loading;
