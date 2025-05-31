import {useEffect, useState} from "react";
import {get as getVisitors} from "../../utils/api/visitor.jsx"

export const VisitorData = ({setVisitor}) => {
    const [months, setMonths] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        getVisitors({dashboard: true}).then((result) => {
            const {months, visitors, total} = result;
            setMonths(months);
            setData(visitors);
            setVisitor(total)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        labels : months,
        dataUnit : 'Pengunjung',
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