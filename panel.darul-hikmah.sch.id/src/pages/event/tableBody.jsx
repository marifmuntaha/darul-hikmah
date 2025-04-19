import React from "react";
import {DataTableBody, DataTableHead, DataTableItem, DataTableRow, Icon} from "../../components/index.jsx";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {destroy as destroyEvent} from "../../utils/api/event.jsx";
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
                    <h6 className="overline-title">Lokasi</h6>
                </DataTableRow>
                <DataTableRow size="sm">
                    <h6 className="overline-title">Mulai</h6>
                </DataTableRow>
                <DataTableRow size="md">
                    <h6 className="overline-title">Selesai</h6>
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
                                <div className="sub-text d-inline-flex flex-wrap gx-2">{item.location}</div>
                            </DataTableRow>
                            <DataTableRow size="sm">
                                <div className="sub-text d-inline-flex flex-wrap gx-2">{item.start}</div>
                            </DataTableRow>
                            <DataTableRow size="md">
                                <div className="sub-text d-inline-flex flex-wrap gx-2">{item.end}</div>
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
                                                            href={`http://localhost:8000/kegiatan/${item.id}/lihat`}
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
                                                                navigate(`/event/${item.id}/ubah`);
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
                                                                destroyEvent(item.id).then(() => {
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