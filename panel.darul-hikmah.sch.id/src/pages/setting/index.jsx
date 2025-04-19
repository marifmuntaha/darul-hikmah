import React, {useEffect, useState} from "react";
import Head from "../../layout/head/index.jsx";
import Content from "../../layout/content/index.jsx";
import {
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    PreviewCard, Toast
} from "../../components/index.jsx";
import {Button, Col, Input, Row, Spinner} from "reactstrap";
import {get as getSetting, update as updateSetting} from "../../utils/api/setting.jsx"

const Setting = () => {
    const [loading, setLoading] = useState(false);
    const [setting, setSetting] = useState([]);
    const getData = () => {
        getSetting().then((resp) => {
            setSetting(resp.result);
        })
    }
    const onSubmit = () => {
        setLoading(true);
        setting.map((item) => {
            updateSetting(item);
        })
        setTimeout(() => {
            getData();
            setLoading(false);
            Toast('Pengaturan berhasil diperbarui.', 'success');
        }, 4000);
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <React.Fragment>
            <Head title="Pengaturan"/>
            <Content>
                <BlockHead size="md">
                    <div className="nk-block-head-sub"><span></span></div>
                    <BlockHeadContent>
                        <BlockTitle className="page-title">Pengaturan</BlockTitle>
                        <BlockDes>
                            <p>Pengaturan dasar website mencakup beberapa aspek utama yang memastikan situs dapat
                                berjalan dengan baik dan optimal</p>
                        </BlockDes>
                    </BlockHeadContent>
                </BlockHead>
                <PreviewCard className="shadow">
                    <form className="gy-3">
                        <Row className="g-3 align-center">
                            <Col lg="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="appname">
                                        Nama Website
                                    </label>
                                    <span className="form-note">Tentukan nama situs web Anda.</span>
                                </div>
                            </Col>
                            <Col lg="8">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            id="appname"
                                            className="form-control"
                                            value={String(setting.length > 0 && setting[0].content)}
                                            onChange={(e) => {
                                                setSetting(setting.map((item) => {
                                                    return item.name === 'appname' ? {
                                                        ...item,
                                                        content: e.target.value
                                                    } : item
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone">
                                        Nomor Telepon
                                    </label>
                                    <span className="form-note">Tentukan nomor telepon situs web Anda.</span>
                                </div>
                            </Col>
                            <Col lg="8">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            id="phone"
                                            className="form-control"
                                            value={String(setting.length > 0 && setting[2].content)}
                                            onChange={(e) => {
                                                setSetting(setting.map((item) => {
                                                    return item.name === 'phone' ? {
                                                        ...item,
                                                        content: e.target.value
                                                    } : item
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Alamat Email</label>
                                    <span className="form-note">Tentukan alamat email situs web Anda.</span>
                                </div>
                            </Col>
                            <Col lg="8">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            id="email"
                                            className="form-control"
                                            value={String(setting.length > 0 && setting[3].content)}
                                            onChange={(e) => {
                                                setSetting(setting.map((item) => {
                                                    return item.name === 'email' ? {
                                                        ...item,
                                                        content: e.target.value
                                                    } : item
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="whatsapp">Whatsapp</label>
                                    <span className="form-note">Tentukan whatsapp situs web Anda.</span>
                                </div>
                            </Col>
                            <Col lg="8">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            id="whatsapp"
                                            className="form-control"
                                            value={String(setting.length > 0 && setting[4].content)}
                                            onChange={(e) => {
                                                setSetting(setting.map((item) => {
                                                    return item.name === 'whatsapp' ? {
                                                        ...item,
                                                        content: e.target.value
                                                    } : item
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="instagram">Instagram</label>
                                    <span className="form-note">Tentukan instagram situs web Anda.</span>
                                </div>
                            </Col>
                            <Col lg="8">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            id="instagram"
                                            className="form-control"
                                            value={String(setting.length > 0 && setting[5].content)}
                                            onChange={(e) => {
                                                setSetting(setting.map((item) => {
                                                    return item.name === 'instagram' ? {
                                                        ...item,
                                                        content: e.target.value
                                                    } : item
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="youtube">Youtube</label>
                                    <span className="form-note">Tentukan youtube situs web Anda.</span>
                                </div>
                            </Col>
                            <Col lg="8">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            id="youtube"
                                            className="form-control"
                                            value={String(setting.length > 0 && setting[6].content)}
                                            onChange={(e) => {
                                                setSetting(setting.map((item) => {
                                                    return item.name === 'youtube' ? {
                                                        ...item,
                                                        content: e.target.value
                                                    } : item
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="4">
                                <div className="form-group">
                                    <label className="form-label" form="footerAbout">Tentang</label>
                                    <span className="form-note">Informasi singkat situs web Anda.</span>
                                </div>
                            </Col>
                            <Col lg="8">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <textarea
                                            id="footer-about"
                                            className="form-control"
                                            value={String(setting.length > 0 && setting[9].content)}
                                            onChange={(e) => {
                                                setSetting(setting.map((item) => {
                                                    return item.name === 'footerAbout' ? {
                                                        ...item,
                                                        content: e.target.value
                                                    } : item
                                                }))
                                            }}>
                                            {setting.length > 0 && setting[9].content}
                                        </textarea>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="4">
                                <div className="form-group">
                                    <label className="form-label" >Gambar</label>
                                    <span className="form-note">Logo situs web Anda.</span>
                                </div>
                            </Col>
                            <Col lg="8">
                                <Row>
                                    <Col lg="4">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <label className="form-label" form="logo">Logo</label>
                                                <Input
                                                    type="file"
                                                    id="logo"
                                                    onChange={(e) => setSetting(setting.map((item) => {
                                                        return item.name === 'logo' ? {
                                                            ...item,
                                                            content: e.target.files[0]
                                                        } : item
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="4">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <label className="form-label" form="footerBg">Background Footer</label>
                                                <Input
                                                    type="file"
                                                    id="footer-bg"
                                                    onChange={(e) => setSetting(setting.map((item) => {
                                                        return item.name === 'footerBg' ? {
                                                            ...item,
                                                            content: e.target.files[0]
                                                        } : item
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="4">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <label className="form-label" form="favicon">Favicon</label>
                                                <Input
                                                    type="file"
                                                    id="favicon"
                                                    onChange={(e) => setSetting(setting.map((item) => {
                                                        return item.name === 'favicon' ? {
                                                            ...item,
                                                            content: e.target.files[0]
                                                        } : item
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="g-3">
                            <Col lg="8" className="offset-lg-4">
                                <div className="form-group mt-2">
                                    <Button color="primary" size="md" onClick={() => onSubmit()}>
                                        {loading ? <Spinner size="sm"/> : "PERBARUI"}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </PreviewCard>
            </Content>
        </React.Fragment>
    )
}

export default Setting;