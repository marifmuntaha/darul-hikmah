import React, {useEffect, useState} from "react";
import Head from "../../layout/head/index.jsx";
import {
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon, PreviewCard
} from "../../components/index.jsx";
import Content from "../../layout/content/index.jsx";
import {get as getMenus} from "../../utils/api/menu.jsx"
import Table from "./table.jsx";
import Partial from "./partial.jsx";

const Menu = () => {
    const [sm, updateSm] = useState(false);
    const [modal, setModal] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(true);
    const [menus, setMenus] = useState([]);
    const [menu, setMenu] = useState(null);
    const getData = () => {
        getMenus().then((resp) => {
            setMenus(resp);
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false))
    }
    useEffect(() => {
        dataRefresh && getData();
    }, [dataRefresh]);
    return (
        <>
            <Head title="Pengaturan Menu"/>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3" page>
                                Data Menu
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Silahkan sesuaikan pengaturan menu anda</p>
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
                    <Table data={menus} setDataRefresh={setDataRefresh} setModal={setModal} setMenu={setMenu} />
                </PreviewCard>
            </Content>
            <Partial modal={modal} setModal={setModal} setDataRefresh={setDataRefresh} menu={menu} setMenu={setMenu} parent={menus}/>
        </>
    )
}

export default Menu;