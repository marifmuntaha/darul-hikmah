import React, {useEffect, useState} from "react";
import Head from "../../layout/head/index.jsx";
import Content from "../../layout/content/index.jsx";
import {
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PreviewCard, Toast
} from "../../components/index.jsx";
import {Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {get as getPage, update as updatePage, upload as uploadPage} from "../../utils/api/page.jsx";

const Feature = () => {
    const [dataRefresh, setDataRefresh] = useState(true);
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState({
        add: false,
        save: false
    });
    const [features, setFeatures] = useState([]);
    const [feature, setFeature] = useState({
        title: '',
        content: '',
        image: undefined
    });
    const toggle = () => {
        setModal(!modal);
    }
    const onAdd = () => {
        setLoading({add: true, save: false});
        uploadPage({image: feature.image}).then((resp) => {
            feature.image = resp
            setFeatures([...features, feature])
            toggle()
            setLoading({add: false, save: false});
        }).catch(() => setLoading({add: false, save: false}))
    }
    const onUpdate = async () => {
        setLoading({add: false, save: true});
        const params = {
            id: data?.id,
            name: data.name,
            content: features
        };
        await updatePage(params).then(() => {
            setLoading({add: false, save: false});
            setDataRefresh(true);
        }).catch(() => setLoading({add: false, save: false}));
    }
    useEffect(() => {
        dataRefresh && getPage({name: 'home_widget_feature'}).then((resp) => {
            setFeatures(JSON.parse(resp.content))
            setData(resp);
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false))

    }, [dataRefresh]);

    return (
        <React.Fragment>
            <Head title={"Widget Fitur"} />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3">
                                Widget Fitur
                            </BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <div className="toggle-expand-content">
                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <Button
                                                color="info"
                                                outline
                                                className="btn-white"
                                                size="md"
                                                onClick={() => setModal(true)}>
                                                <Icon name="plus"></Icon>
                                                <span>TAMBAH</span>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                outline
                                                color="danger"
                                                className="btn-white"
                                                size="md"
                                                onClick={() => onUpdate()}
                                                disabled={loading.save}>
                                                {loading.save ? <Spinner size={"sm"}/> : <><Icon name="save"></Icon><span>SIMPAN</span></> }
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <PreviewCard>
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered">
                            <thead>
                            <tr className="text-center">
                                <th>Judul</th>
                                <th>Diskripsi</th>
                                <th>Gambar</th>
                                <th>Aksi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {features.length > 0 && features.map((feature, index) => (
                                <tr key={index} className="text-center">
                                    <td>{feature.title}</td>
                                    <td className="text-start">{feature.content}</td>
                                    <td className="w-15"><img className="w-100 rounded-top h-15" src={feature.image} alt="" /></td>
                                    <td>{
                                        <Button color={"danger"} outline size={"sm"} onClick={() => {
                                            setFeatures(() => {
                                                return features.filter((item) => {
                                                    return item.title !== feature.title
                                                })
                                            });
                                        }}><Icon name={"trash"}/></Button>
                                    }</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </PreviewCard>
            </Content>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Tambah</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label className="form-label" htmlFor="title">Nama</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Ex. Berintegritas"
                                onChange={(e) => {
                                    setFeature({...feature, title: e.target.value});
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="about">Diskripsi</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                onChange={(e) => {
                                    setFeature({...feature, content: e.target.value});
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
                                    setFeature({...feature, image: e.target.files[0]});
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button color="success" onClick={() => onAdd()} size="md" disabled={loading.add}>
                            {loading.add ? <Spinner size="sm"/> : 'SIMPAN' }
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default Feature;