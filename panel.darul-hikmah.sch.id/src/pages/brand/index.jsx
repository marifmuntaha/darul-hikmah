import React, {useEffect, useState} from "react";
import Head from "../../layout/head/index.jsx";
import Content from "../../layout/content/index.jsx";
import {
    BlockBetween,
    BlockDes, BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PreviewCard, ReactDataTable
} from "../../components/index.jsx";
import {ButtonGroup, Spinner} from "reactstrap";
import {get as getBrands, destroy as destroyBrand} from "../../utils/api/brand.jsx"
import {Partial} from "./partial.jsx";

const Brand = () => {
    const [sm, updateSm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(true);
    const [modal, setModal] = useState(false);
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState(null);
    const Column = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: true,
            width: "200px",
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
            sortable: false,
            // hide: 370,
            maxWidth: "600px",
        },
        {
            name: "Logo",
            selector: (row) => row.image,
            sortable: false,
            // hide: 370,
            cell: (row) => (
                <img className="rounded-5 w-50 mt-2 mb-2" src={row.image} alt={row.name} />
            )
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            // hide: "md",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setBrand(row);
                        setModal(true);
                    }}><Icon name="pen"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id)
                        destroyBrand(row.id).then(() => {
                            setLoading(false);
                            setDataRefresh(true);
                        }).catch(() => setLoading(false))
                    }}>{loading === row.id ? <Spinner size="sm" /> : <Icon name="trash" /> }</Button>
                </ButtonGroup>
            )
        },
    ];
    const getData = () => {
        getBrands().then((resp) => {
            setBrands(resp);
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false))
    }

    useEffect(() => {
        dataRefresh && getData()
    }, [dataRefresh]);
    return (
        <React.Fragment>
            <Head title={"Data Brand"}/>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3" page>
                                Data Brand
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Anda mempunyai {brands?.length} brand</p>
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
                                <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <Button color="primary" outline className="btn-white"
                                                    onClick={() => setModal(true)}>
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
                    <ReactDataTable data={brands} columns={Column} pagination/>
                </PreviewCard>
            </Content>
            <Partial modal={modal} setModal={setModal} brand={brand} setBrand={setBrand} setDataRefresh={setDataRefresh} />
        </React.Fragment>
    )
}

export default Brand;