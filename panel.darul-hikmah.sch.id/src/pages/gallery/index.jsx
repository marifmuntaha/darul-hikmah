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
import {ButtonGroup, Spinner} from "reactstrap";
import {get as getGalleries, destroy as destroyGallery} from "../../utils/api/gallery.jsx"
import {Partial} from "./partial.jsx";

const Gallery = () => {
    const [sm, updateSm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(true);
    const [modal, setModal] = useState(false);
    const [galleries, setGalleries] = useState([]);
    const [gallery, setGallery] = useState(null)
    const Column = [
        {
            name: "Judul",
            selector: (row) => row.title,
            sortable: true,
            width: "200px",
        },
        {
            name: "Konten",
            selector: (row) => row.content,
            sortable: false,
            // width: "800px",
            // hide: 370,
        },
        {
            name: "Gambar",
            selector: (row) => `${row.images?.length} Gambar`,
            sortable: false,
            // width: "800px",
            // hide: 370,
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            // hide: "md",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setGallery(row);
                        setModal(true);
                    }}><Icon name="pen"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id)
                        destroyGallery(row.id).then(() => {
                            setLoading(false);
                            setDataRefresh(true);
                        }).catch(() => setLoading(false))
                    }}>{loading === row.id ? <Spinner size="sm" /> : <Icon name="trash" /> }</Button>
                </ButtonGroup>
            )
        },
    ];

    useEffect(() => {
        dataRefresh && getGalleries().then((resp) => {
            setGalleries(resp);
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false))
    }, [dataRefresh]);
    return (
        <React.Fragment>
            <Head title={"Data Galeri"} />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3" page>
                                Data Galeri
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Anda mempunyai {galleries.length} Galeri</p>
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
                                            <Button color="primary" outline className="btn-white" onClick={() => setModal(true)}>
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
                    <ReactDataTable data={galleries} columns={Column} pagination />
                </PreviewCard>
            </Content>
            <Partial modal={modal} setModal={setModal} gallery={gallery} setGallery={setGallery} setDataRefresh={setDataRefresh} />
        </React.Fragment>
    )
}

export default Gallery;