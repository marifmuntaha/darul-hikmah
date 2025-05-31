import React, {useEffect, useState} from "react";
import {ButtonGroup, Spinner} from "reactstrap";
import {Button, Icon} from "../../components/index.jsx";
import {destroy as destroyMenu} from "../../utils/api/menu.jsx"

const Table = ({data, setDataRefresh, setModal, setMenu}) => {
    const [loading, setLoading] = useState(false);
    const [parent, setParent] = useState([]);
    const [children, setChildren] = useState([]);
    const buttonAction = (data) => {
        return (
            <ButtonGroup size="sm">
                <Button size="sm" color="warning" outline onClick={() => {
                    setMenu(data);
                    setModal(true);
                }}>
                    <Icon name="pen"/>
                </Button>
                <Button size="sm" color="danger" outline onClick={() => {
                    setLoading(data.id);
                    destroyMenu(data.id).then(() => {
                        setDataRefresh(true)
                    })
                }}>
                    {loading === data.id ? <Spinner size="sm"/> : <Icon name="trash"/>}
                </Button>
            </ButtonGroup>
        )
    }

    useEffect(() => {
        setParent(data.filter((item) => {
            return item.parent === 0
        }))
        setChildren(data.filter((item) => {
            return item.parent !== 0
        }));
    }, [data]);
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                <tr className="text-center">
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Parent</th>
                    <th>Link</th>
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody>
                {parent.length > 0 ? parent?.map((item) => {
                    if (item.child === 1) {
                        return (
                            <React.Fragment key={item.id} >
                                <tr className="text-center">
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>-</td>
                                    <td>{item.link}</td>
                                    <td>{buttonAction(item)}</td>
                                </tr>
                                {children.map((child) => {
                                    return child.parent === item.id && (
                                        <tr key={child.id} className="text-center">
                                            <td>{child.id}</td>
                                            <td>-</td>
                                            <td>{child.name}</td>
                                            <td>{child.link}</td>
                                            <td>{buttonAction(child)}</td>
                                        </tr>
                                    )
                                })}
                            </React.Fragment>
                        );
                    } else {
                        return (
                            <tr key={item.id} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>-</td>
                                <td>{item.link}</td>
                                <td>{buttonAction(item)}</td>
                            </tr>
                        );
                    }
                }) : <tr className="text-center">
                    <td colSpan="5"><span className="text-muted ff-italic">Tidak ada tombol</span></td>
                </tr>}
                </tbody>
            </table>
        </div>
    )
}

export default Table;