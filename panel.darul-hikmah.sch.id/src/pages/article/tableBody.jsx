import React from "react";
import {DataTableBody, DataTableHead, DataTableItem, DataTableRow, Icon, Toast} from "../../components/index.jsx";
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {colorPallet, randomIntFromInterval} from "../../utils/Utils.jsx";
import {destroy as destroyArticle} from "../../utils/api/article.jsx";
import {useNavigate} from "react-router-dom";

const TableBody = ({ data, setDataRefresh }) => {
    const navigate = useNavigate();
    return (
        <DataTableBody>
            <DataTableHead>
                <DataTableRow>
                    <h6 className="overline-title">Judul</h6>
                </DataTableRow>
                <DataTableRow size="sm">
                    <h6 className="overline-title">kategori</h6>
                </DataTableRow>
                <DataTableRow size="sm">
                    <h6 className="overline-title">tagar</h6>
                </DataTableRow>
                <DataTableRow size="md">
                    <h6 className="overline-title">author</h6>
                </DataTableRow>
                <DataTableRow></DataTableRow>
            </DataTableHead>
            {data.length > 0
                ? data.map((item, idx) => {
                    return (
                        <DataTableItem key={idx}>
                            <DataTableRow>
                                <div className="caption-text">{item.title}</div>
                            </DataTableRow>
                            <DataTableRow size="md">
                                <div className="sub-text d-inline-flex flex-wrap gx-2">{item?.category?.name}</div>
                            </DataTableRow>
                            <DataTableRow size="sm">
                                {item.tags.map((tag) => (
                                    <Badge key={tag.id} color={colorPallet[randomIntFromInterval(1, 15)]} className="badge-dim rounded-pill">{tag.name}</Badge>
                                ))}
                            </DataTableRow>
                            <DataTableRow size="md">
                                <div className="sub-text d-inline-flex flex-wrap gx-2">{item?.user?.name}</div>
                            </DataTableRow>
                            <DataTableRow className="nk-tb-col-tools">
                                <ul className="nk-tb-actions gx-1">
                                    <li>
                                        <UncontrolledDropdown>
                                            <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                                <Icon name="more-h"></Icon>
                                            </DropdownToggle>
                                            <DropdownMenu end>
                                                <ul className="link-list-opt no-bdr">
                                                    <li>
                                                        <DropdownItem
                                                            tag="a"
                                                            target="_blank"
                                                            href={`http://localhost:8000/berita/${item.slug}/lihat`}
                                                        >
                                                            <Icon name="eye"></Icon>
                                                            <span>Lihat Artikel</span>
                                                        </DropdownItem>
                                                    </li>
                                                    <li>
                                                        <DropdownItem
                                                            tag="a"
                                                            href={"#"}
                                                            onClick={() => {
                                                                navigate(`/artikel/${item.id}/ubah`);
                                                            }}
                                                        >
                                                            <Icon name="edit"></Icon>
                                                            <span>Ubah</span>
                                                        </DropdownItem>
                                                    </li>
                                                    <li>
                                                        <DropdownItem
                                                            tag="a"
                                                            href={"#"}
                                                            onClick={() => {
                                                                destroyArticle(item.id).then((resp) => {
                                                                    Toast(resp.data.message, 'success')
                                                                    setDataRefresh(true);
                                                                })
                                                            }}
                                                        >
                                                            <Icon name="trash"></Icon>
                                                            <span>Hapus Permanen</span>
                                                        </DropdownItem>
                                                    </li>
                                                </ul>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </li>
                                </ul>
                            </DataTableRow>
                        </DataTableItem>
                    )
                }) : null
            }
        </DataTableBody>
    )
}

export default TableBody;