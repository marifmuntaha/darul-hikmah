import {useEffect, useState} from "react";
import {get as getEvents} from "../../utils/api/event.jsx"

export const EventData = ({setEvent}) => {
    const [months, setMonths] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        getEvents({dashboard: true}).then((result) => {
            const {months, events, total} = result;
            setMonths(months);
            setData(events);
            setEvent(total);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        labels : months,
        dataUnit : 'Kegiatan',
        datasets : [{
            label : "Bulan",
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