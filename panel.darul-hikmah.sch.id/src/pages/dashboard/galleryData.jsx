import {useEffect, useState} from "react";
import {get as getGallery} from "../../utils/api/gallery.jsx"

export const GalleryData = ({setGallery}) => {
    const [months, setMonths] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        getGallery({dashboard: true}).then((result) => {
            const {months, galleries, total} = result;
            setMonths(months);
            setData(galleries);
            setGallery(total)
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