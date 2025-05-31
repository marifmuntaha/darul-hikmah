import {useEffect, useState} from "react";
import {get as getArticle} from "../../utils/api/article.jsx"

export const ArticleData = ({setArticle}) => {
    const [months, setMonths] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        getArticle({dashboard: true}).then((result) => {
            const {months, article, total} = result;
            setMonths(months);
            setData(article);
            setArticle(total)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        labels : months,
        dataUnit : 'Artikel',
        datasets : [{
            label : "People",
            lineTension: .3,
            borderWidth: 1,
            fill:true,
            color: "#fff",
            backgroundColor: "rgba(255,255,255,.15)",
            borderColor: "#fff",
            pointBorderColor: "transparent",
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 4,
            data: data,
        }]
    }
}