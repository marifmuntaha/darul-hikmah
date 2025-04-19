import React, {useEffect, useState} from "react";
import Head from "../../layout/head/index.jsx";
import Content from "../../layout/content/index.jsx";
import {
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon, PreviewCard, ReactDataTable, Toast
} from "../../components/index.jsx";
import {get as getSliders, destroy as destroySlider} from "../../utils/api/slider.jsx"
import {Badge, ButtonGroup, Spinner} from "reactstrap";
import {useNavigate} from "react-router-dom";

const Slider = () => {
    const navigate = useNavigate();
    const [sm, updateSm] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(true);
    const [loading, setLoading] = useState(false);
    const [sliders, setSliders] = useState([]);
    const Column = [
        {
            name: "Judul",
            selector: (row) => row.title,
            sortable: true,
            width: "300px",
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
            sortable: false,
            width: "500px",
            // hide: 370,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: false,
            cell: (row) => {
                switch (row.status) {
                    case "1":
                        return <Badge pill color="success">Aktif</Badge>
                    case "2":
                        return <Badge pill color="danger">Tidak Aktif</Badge>
                    default:
                }
            }
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            // hide: "md",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        navigate(`/slider/${row.id}/ubah`);
                    }}><Icon name="pen"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id)
                        destroySlider(row.id).then(() => {
                            setLoading(false);
                            setDataRefresh(true);
                        })
                    }}>{loading === row.id ? <Spinner size="sm" /> : <Icon name="trash" /> }</Button>
                </ButtonGroup>
            )
        },
    ];
    const getData = async () => {
        const {result} = await getSliders()
        setSliders(result)
    }

    useEffect(() => {
        dataRefresh && getData().then(() => setDataRefresh(false)).catch(() => setDataRefresh(false))
    }, [dataRefresh]);

    return (
        <>
            <Head title='Data Slider' />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3" page>
                                Data Slider
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Anda mempunyai {sliders.length} slider</p>
                            </BlockDes>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <Button
                                    className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                    onClick={() => updateSm(!sm)}
                                >
                                    <Icon name="menu-alt-r"></Icon>
                                </Button>
                                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <Button color="primary" outline className="btn-white" onClick={() => navigate('/slider/tambah')}>
                                                <Icon name="plus"></Icon>
                                                <span>TAMBAH</span>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <PreviewCard>
                    <ReactDataTable data={sliders} columns={Column} pagination />
                </PreviewCard>
            </Content>
        </>
    )
}

export default Slider;