import React, {useEffect, useState} from "react";
import {
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button, Col, Icon,
    PreviewCard, Row
} from "../../components/index.jsx";
import {Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {get as getPage, update as updatePage, upload as uploadPage} from "../../utils/api/page.jsx"
import Content from "../../layout/content/index.jsx";
import Head from "../../layout/head/index.jsx";

const Admission = () => {
    const [dataRefresh, setDataRefresh] = useState(true);
    const [data, setData] = useState({});
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState([]);
    const [content, setContent] = useState({
        link: '',
        image: undefined,
        title: '',
        description: '',
    });
    const [admission, setAdmission] = useState({
        title: '',
        description: '',
        background: undefined,
        content: []
    });
    const addAdmission = () => {
        uploadPage({image: content.image}).then((resp) => {
            content.image = resp
            setContents([...contents, content])
            toggle()
        })
    }
    const deleteAdmission = (title) => {
        setContents(contents.filter((item) => {
            return item.title !== title;
        }))
    }
    const onUpdate = () => {
        const params = {
            id: data.id,
            name: data.name,
            content: admission,
        }
        updatePage(params).then(() => setLoading(false)).catch(() => setLoading(false));


    }
    const toggle = () => {
        setModal(false);
    }

    useEffect(() => {
        dataRefresh && getPage({name: 'home_widget_admission'}).then((resp) => {
            setData(resp)
            const admission = JSON.parse(resp.content)
            setAdmission(admission)
            const contents = admission.content ? admission.content : []
            setContents(contents)
            setDataRefresh(false)
        }).catch(() => setDataRefresh(false))
    }, [dataRefresh]);
    useEffect(() => {
        setAdmission({...admission, content: contents})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contents]);

    return (
        <React.Fragment>
            <Head title={"Widget PPDB"} />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h5">
                                Widget PPDB
                            </BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <div className="toggle-expand-content">
                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <Button
                                                color="info"
                                                className="btn-white"
                                                size="md"
                                                outline
                                                disabled={loading}
                                                onClick={() => setModal(true)}>
                                                <Icon name="plus"></Icon><span>TAMBAH</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                color="danger"
                                                className="btn-white"
                                                size="md"
                                                outline
                                                disabled={loading}
                                                onClick={() => onUpdate()}>
                                                {loading ? <Spinner size="sm" color="danger"/> : <><Icon name="save"></Icon>
                                                    <span>SIMPAN</span></>}
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Row className="gy-3">
                    <Col size="4">
                        <PreviewCard>
                            <div className="form-group">
                                <label className="form-label" htmlFor="title">Judul</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Ex. Tentang Kami"
                                        defaultValue={admission?.title}
                                        onChange={(e) => {
                                            setAdmission({...admission, title: e.target.value});
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="description">Diskripsi</label>
                                <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                defaultValue={admission?.description}
                                onChange={(e) => {
                                    setAdmission({...admission, description: e.target.value});
                                }}
                            />
                                </div>
                            </div>
                        </PreviewCard>
                    </Col>
                    <Col size="8">
                        <PreviewCard>
                            <div className="table-responsive mt-3 mb-5">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr className="text-center">
                                        <th>Link</th>
                                        <th>Gambar</th>
                                        <th>Judul</th>
                                        <th>Diskripsi</th>
                                        <th>Aksi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {contents && contents.map((item, idx) => {
                                        return (
                                            <tr key={idx} className="text-center">
                                                <td>{item.link}</td>
                                                <td className="w-20"><img className="rounded-5" src={item.image} alt="" /></td>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td><Button outline color={"danger"} size={"sm"} onClick={() => deleteAdmission(item.title)}><Icon name={"trash"}/></Button></td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </PreviewCard>
                    </Col>
                </Row>
            </Content>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Tambah</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label className="form-label" htmlFor="link">Link</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="link"
                                placeholder="Ex. https://ma.darul-hikmah.sch.id"
                                onChange={(e) => {
                                    setContent({...content, link: e.target.value});
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="image">Gambar</label>
                        <div className="form-control-wrap">
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                onChange={(e) => {
                                    setContent({...content, image: e.target.files[0]});
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="title">Judul</label>
                        <div className="form-control-wrap">
                            <input
                                type="type"
                                className="form-control"
                                id="title"
                                onChange={(e) => {
                                    setContent({...content, title: e.target.value});
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">Diskripsi</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                onChange={(e) => {
                                    setContent({...content, description: e.target.value});
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button color="primary" onClick={() => addAdmission()} size="md">SIMPAN</Button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default Admission;