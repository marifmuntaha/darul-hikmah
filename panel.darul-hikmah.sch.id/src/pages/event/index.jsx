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
import {
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from "reactstrap";
import {get as getEvent} from "../../utils/api/event.jsx"
import {useNavigate} from "react-router-dom";
import TableBody from "./tableBody.jsx";

const Event = () => {
    const navigate = useNavigate();
    const [dataRefresh, setDataRefresh] = useState(true);
    const [data, setData] = useState([]);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const toggle = () => setonSearch(!onSearch);
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        dataRefresh && getEvent({with: ['category', 'tags']}).then((resp) => {
            setData(resp)
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false))
    }, [dataRefresh])

    useEffect(() => {
        if (onSearchText !== "") {
            const filteredObject = data.filter((item) => {
                return (
                    item.title.toLowerCase().includes(onSearchText.toLowerCase())
                );
            });
            setData([...filteredObject]);
        } else {
            setDataRefresh(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSearchText, setData]);

    return (
        <React.Fragment>
            <Head title="Document Saved"></Head>
            <Content>
                <BlockHead size="lg">
                    <div className="nk-block-head-sub"><span></span></div>
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle className="page-title">Daftar Event</BlockTitle>
                            <BlockDes>
                                <p>
                                    Daftar semua event yang tersimpan.</p>
                            </BlockDes>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <Button outline color="primary" size="md" onClick={() => navigate("/event/tambah")}>
                                <Icon name={"plus"}/> <span>Tambah</span>
                            </Button>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <DataTable className="card-stretch">
                    <div className="card-inner position-relative card-tools-toggle">
                        <div className="card-title-group">
                            <div className="nav-tabs-s2">
                                <h5>Event</h5>
                            </div>
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
                                            <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
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
                    <TableBody data={currentItems} setDataRefresh={setDataRefresh}/>
                    <div className="card-inner border-top">
                        {currentItems.length > 0 ? (
                            <PaginationComponent
                                itemPerPage={itemPerPage}
                                totalItems={data.length}
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

export default Event;