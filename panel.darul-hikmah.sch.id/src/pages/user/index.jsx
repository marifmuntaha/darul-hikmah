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
import {get as getUsers, destroy as destroyUser} from "../../utils/api/user.jsx"
import {Badge, ButtonGroup, Spinner} from "reactstrap";
import Partial from "./partial.jsx";

const User = () => {
    const [sm, updateSm] = useState(false);
    const [modal, setModal] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(true);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    // noinspection JSUnresolvedReference
    const Column = [
        {
            name: "Nama",
            selector: (row) => row.fullName,
            sortable: true,
        },
        {
            name: "Alamat Email",
            selector: (row) => row.email,
            sortable: true,
            // hide: 370,
        },
        {
            name: "Hak Akses",
            selector: (row) => row.role,
            sortable: true,
            // hide: "sm",
            cell: (row) => {
                switch (row.role) {
                    case "1":
                        return (<Badge pill color="success">Admin</Badge>)
                    case "2":
                        return (<Badge pill color="info">Penulis</Badge>)
                    default:
                        return (<Badge pill color="warning">Editor</Badge>)
                }
            }
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: true,
            // hide: "md",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setUser(row);
                        setModal(true);
                    }}><Icon name="pen"/></Button>
                    <Button outline color="danger" onClick={() => {
                        setLoading(row.id)
                        destroyUser(row.id).then(() => {
                            setLoading(false);
                            setDataRefresh(true);
                        }).catch(() => setLoading(false))
                    }}>{loading === row.id ? <Spinner size="sm" /> : <Icon name="trash" /> }</Button>
                </ButtonGroup>
            )
        },
    ];
    const getData = () => {
        getUsers().then((result) => {
            setUsers(result);
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false));
    }

    useEffect(() => {
        dataRefresh && getData()
    }, [dataRefresh]);
    return (
        <>
            <Head title='Data Pengguna' />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3" page>
                                Daftar Pengguna
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Anda mempunyai {users.length} pengguna</p>
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
                    <ReactDataTable data={users} columns={Column} pagination />
                </PreviewCard>
            </Content>
            <Partial modal={modal} setModal={setModal} user={user} setUser={setUser} setDataRefresh={setDataRefresh} />
        </>
    )
}

export default User;