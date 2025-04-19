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
    DataTable,
    Icon,
    PaginationComponent
} from "../../components/index.jsx";
import classnames from "classnames";
import {
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    UncontrolledDropdown
} from "reactstrap";
import {get as getArticle} from "../../utils/api/article.jsx"
import {useNavigate} from "react-router-dom";
import TableBody from "./tableBody.jsx";

const Article = () => {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const tabValue = urlParams.get('tab') === null ? "post" : urlParams.get('tab').toString();
    const [dataRefresh, setDataRefresh] = useState(true);
    const [activeTab, setActiveTab] = useState(tabValue);
    const [posts, setPosts] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(10);

    const toggle = () => setonSearch(!onSearch);

    const toggleTab = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItemsPost = posts.slice(indexOfFirstItem, indexOfLastItem);
    const currentItemsDraft = drafts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        dataRefresh && getArticle({with: ['category', 'tags']}).then((result) => {
            setPosts(result.filter((item) => {
                return item.status === '1'
            }))
            setDrafts(result.filter((item) => {
                return item.status === '2'
            }))
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false))
    }, [dataRefresh])

    useEffect(() => {
        if (activeTab === "post") {
            if (onSearchText !== "") {
                const filteredObject = posts.filter((item) => {
                    return (
                        item.title.toLowerCase().includes(onSearchText.toLowerCase())
                    );
                });
                setPosts([...filteredObject]);
            } else {
                setDataRefresh(true);
            }
        }
        if (activeTab === "draft") {
            if (onSearchText !== "") {
                const filteredObject = drafts.filter((item) => {
                    return (
                        item.title.toLowerCase().includes(onSearchText.toLowerCase())
                    );
                });
                setDrafts([...filteredObject]);
            } else {
                setDataRefresh(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, onSearchText, setPosts, setDrafts]);

    return (
        <React.Fragment>
            <Head title="Data Artikel"></Head>
            <Content>
                <BlockHead size="lg">
                    <div className="nk-block-head-sub"><span></span></div>
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle className="page-title">Daftar Artikel</BlockTitle>
                            <BlockDes>
                                <p>
                                    Daftar semua artikel yang tersimpan.</p>
                            </BlockDes>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <Button outline color="primary" size="md" onClick={() => navigate("/artikel/tambah")}>
                                <Icon name={"plus"}/> <span>Tambah</span>
                            </Button>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <DataTable className="card-stretch">
                    <div className="card-inner position-relative card-tools-toggle">
                        <div className="card-title-group">
                            <Nav tabs className="nav-tabs-s2">
                                <NavItem>
                                    <NavLink
                                        tag="a"
                                        href="#tab"
                                        className={classnames([{"py-1": true}, {active: activeTab === "post"}])}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            toggleTab("post");
                                        }}>Postingan</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag="a"
                                        href="#tab"
                                        className={classnames([{"py-1": true}, {active: activeTab === "draft"}])}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            toggleTab("draft");
                                        }}>Draf</NavLink>
                                </NavItem>
                            </Nav>
                            <div className="card-tools me-n1">
                                <ul className="btn-toolbar gx-1">
                                    <li>
                                        <a
                                            href={"#search"}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                toggle();
                                            }}
                                            className="btn btn-icon search-toggle toggle-search"
                                        >
                                            <Icon name="search"></Icon>
                                        </a>
                                    </li>
                                    <li className="btn-toolbar-sep"></li>
                                    <li>
                                        <UncontrolledDropdown>
                                            <DropdownToggle tag="a"
                                                            className="btn btn-trigger btn-icon dropdown-toggle">
                                                <div className="dot dot-primary"></div>
                                                <Icon name="filter-alt"></Icon>
                                            </DropdownToggle>
                                            <DropdownMenu
                                                end
                                                style={{overflow: "visible"}}
                                            >
                                                <div className="dropdown-content">
                                                    <ul className="link-check">
                                                        <li className="active">
                                                            <a href="#"><Icon name="calendar-check"></Icon><span>Tanggal Dibuat</span></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><Icon
                                                                name="edit"></Icon><span>Terakhir diubah</span></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><Icon
                                                                name="text-a"></Icon><span>Abjad</span></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                            <div className="card-body">
                                <div className="search-content">
                                    <Button
                                        className="search-back btn-icon toggle-search active"
                                        onClick={() => {
                                            setSearchText("");
                                            toggle();
                                        }}
                                    >
                                        <Icon name="arrow-left"></Icon>
                                    </Button>
                                    <input
                                        type="text"
                                        className="border-transparent form-focus-none form-control"
                                        placeholder="Cari artikel berdasarkan nama"
                                        value={onSearchText}
                                        onChange={(e) => onFilterChange(e)}
                                    />
                                    <Button className="search-submit btn-icon">
                                        <Icon name="search"></Icon>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="post">
                            <TableBody data={currentItemsPost} setDataRefresh={setDataRefresh}/>
                        </TabPane>
                        <TabPane tabId="draft">
                            <TableBody data={currentItemsDraft} setDataRefresh={setDataRefresh}/>
                        </TabPane>
                    </TabContent>
                    <div className="card-inner border-top">
                        {activeTab === 'post' && currentItemsPost.length > 0 ? (
                            <PaginationComponent
                                itemPerPage={itemPerPage}
                                totalItems={posts.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        ) : activeTab === 'draft' && currentItemsDraft.length > 0 ? (
                            <PaginationComponent
                                itemPerPage={itemPerPage}
                                totalItems={drafts.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        ) : (
                            <div className="text-center">
                                <span className="text-silent">Data Tidak Ditemukan</span>
                            </div>
                        )}
                    </div>
                </DataTable>
            </Content>
        </React.Fragment>
    )
}

export default Article;