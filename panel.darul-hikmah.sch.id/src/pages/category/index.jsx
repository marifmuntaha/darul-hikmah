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
    Icon, PreviewCard, ReactDataTable
} from "../../components/index.jsx";
import {get as getCategories, destroy as destroyCategory} from "../../utils/api/category.jsx"
import {ButtonGroup, Spinner} from "reactstrap";
import {Partial} from "./partial.jsx";

const Category = () => {
    const [sm, updateSm] = useState(false);
    const [modal, setModal] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(true);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
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
            width: "800px",
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
                        setCategory(row);
                        setModal(true);
                    }}><Icon name="pen"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id)
                        destroyCategory(row.id).then(() => {
                            setLoading(false);
                            setDataRefresh(true);
                        })
                    }}>{loading === row.id ? <Spinner size="sm" /> : <Icon name="trash" /> }</Button>
                </ButtonGroup>
            )
        },
    ];
    const getData = async () => {
        await getCategories().then((result) => setCategories(result));
    }

    useEffect(() => {
        dataRefresh && getData().then(() => setDataRefresh(false)).catch(() => setDataRefresh(false));
    }, [dataRefresh]);

    return (
        <>
            <Head title='Data Kategori' />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3" page>
                                Data Kategori
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Anda mempunyai {categories.length} kategori</p>
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
                    <ReactDataTable data={categories} columns={Column} pagination />
                </PreviewCard>
            </Content>
            <Partial modal={modal} setModal={setModal} category={category} setCategory={setCategory} setDataRefresh={setDataRefresh} />
        </>
    )
}

export default Category;