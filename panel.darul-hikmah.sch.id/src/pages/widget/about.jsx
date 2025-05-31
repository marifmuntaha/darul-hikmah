import React, {useEffect, useState} from "react";
import {
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button, Col,
    Icon, ImageContainer,
    PreviewCard, Row, Toast
} from "../../components/index.jsx";
import {get as getPage, update as updatePage, upload as uploadPage} from "../../utils/api/page.jsx"
import {Spinner} from "reactstrap";
import Content from "../../layout/content/index.jsx";
import Head from "../../layout/head/index.jsx";

const About = () => {
    const [dataRefresh, setDataRefresh] = useState(true);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [about, setAbout] = useState({
        title: '',
        contentFirst: '',
        contentSecond: '',
        image: undefined,
        link: '',
        linkText: '',
        video: ''
    });
    const onUpdate = () => {
        setLoading(true);
        const params = {
            id: data.id,
            name: data.name,
            content: JSON.stringify(about),
        }
        if (typeof about.image === "string") {
            updatePage(params).then(() => {
                setLoading(false);
            }).catch(() => setLoading(false));
        } else {
            uploadPage({image: about.image}).then((resp) => {
                about.image = resp
                updatePage(params).then(() => setLoading(false)).catch(() => setLoading(false));
            }).catch(() => setLoading(false));
        }


    }
    useEffect(() => {
        dataRefresh && getPage({name: 'home_widget_about'}).then((resp) => {
            setData(resp);
            setAbout(() => {
                return JSON.parse(resp.content);
            });
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false));

    }, [dataRefresh]);

    useEffect(() => {
        about?.image && setImage(() => {
            return typeof about.image === "string"
                ? about.image
                : URL.createObjectURL(about.image);
        })
    }, [about]);

    return (
        <React.Fragment>
            <Head title={"Widget Tentang Kami"}/>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3">
                                Widget Tentang Kami
                            </BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <div className="toggle-expand-content">
                                    <ul className="nk-block-tools g-3">

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
                    <Col size={"8"}>
                        <PreviewCard>
                            <div className="form-group">
                                <label className="form-label" htmlFor="title">Judul</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Ex. Tentang Kami"
                                        defaultValue={about?.title}
                                        onChange={(e) => {
                                            setAbout({...about, title: e.target.value});
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="contentFirst">Diskripsi Singkat #1</label>
                                <div className="form-control-wrap">
                                    <textarea
                                        className="form-control"
                                        id="contentFirst"
                                        defaultValue={about?.contentFirst}
                                        onChange={(e) => {
                                            setAbout({...about, contentFirst: e.target.value});
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="contentSecond">Diskripsi Singkat #2</label>
                                <div className="form-control-wrap">
                                    <textarea
                                        className="form-control"
                                        id="contentSecond"
                                        defaultValue={about?.contentSecond}
                                        onChange={(e) => {
                                            setAbout({...about, contentSecond: e.target.value});
                                        }}
                                    />
                                </div>
                            </div>
                            <Row className="mt-3 mb-3">
                                <Col lg="6" md="6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="link">Link</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="link"
                                                placeholder="Ex. https://darul-hikmah.sch.id/"
                                                defaultValue={about?.link}
                                                onChange={(e) => {
                                                    setAbout({...about, link: e.target.value});
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="6" md="6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="linkText">Teks Link</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="linkText"
                                                placeholder="Ex. Selengkpanya"
                                                defaultValue={about?.linkText}
                                                onChange={(e) => {
                                                    setAbout({...about, linkText: e.target.value});
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="12" md="12">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="video">Link Video</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="video"
                                                placeholder="Ex. Selengkpanya"
                                                defaultValue={about?.video}
                                                onChange={(e) => {
                                                    setAbout({...about, video: e.target.value});
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </PreviewCard>
                    </Col>
                    <Col size={"4"}>
                        <PreviewCard>
                            <Row className="mt-3 mb-3">
                                <Col size={"12"}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="image">Gambar</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="image"
                                                onChange={(e) => {
                                                    setAbout({...about, image: e.target.files[0]});
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            {image && (
                                <Col size={"12"}>
                                    <ImageContainer img={image}/>
                                </Col>
                            )}
                        </PreviewCard>
                    </Col>
                </Row>
            </Content>
        </React.Fragment>
    )
}

export default About;