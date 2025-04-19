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

const Course = () => {
    const [dataRefresh, setDataRefresh] = useState(true);
    const [data, setData] = useState({});
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState([]);
    const [content, setContent] = useState({
        link: '',
        image: {},
        title: '',
        subtitle: '',
        description: '',
    });
    const [course, setCourse] = useState({
        title: '',
        description: '',
        background: undefined,
        content: []
    });
    const [image, setImage] = useState('')
    const addCourse = async () => {
        await uploadPage({image: content.image}).then((resp) => {
            content.image = resp
            setContents([...contents, content])
            toggle()
        })
    }
    const deleteCourse = (title) => {
        setContents(contents.filter((item) => {
            return item.title !== title;
        }))
    }
    const onUpdate = () => {
        if (typeof course.background === "string") {
            const params = {
                id: data.id,
                name: data.name,
                content: course,
            }
            updatePage(params).then(() => setLoading(false)).catch(() => setLoading(false));
        } else {
            uploadPage({image: course.background}).then((resp) => {
                course.background = resp;
                const params = {
                    id: data.id,
                    name: data.name,
                    content: course,
                }
                updatePage(params).then(() => setLoading(false)).catch(() => setLoading(false));
            }).catch(() => setLoading(false))
        }
    }
    const toggle = () => {
        setContent({
            link: '',
            image: {},
            title: '',
            subtitle: '',
            description: '',
        })
        setModal(!modal);
    }

    useEffect(() => {
        dataRefresh && getPage({name: 'home_widget_course'}).then((resp) => {
            setData(resp)
            const course = JSON.parse(resp.content)
            setCourse(course)
            const contents = course.content
            setContents(contents.length > 0 ? contents : [])
            setDataRefresh(false)
        }).catch(() => setDataRefresh(false))
    }, [dataRefresh]);

    useEffect(() => {
        setCourse({...course, content: contents})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contents]);

    useEffect(() => {
        course?.background && setImage(() => {
            return typeof course.background === "object"
                ? URL.createObjectURL(course.background)
                : course.background;
        })
    }, [course]);

    useEffect(() => {
        console.log(contents)
    }, [contents])

    return (
        <React.Fragment>
            <Head title={"Widget Lembaga"} />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h5">
                                Widget Lembaga
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
                                        defaultValue={course?.title}
                                        onChange={(e) => {
                                            setCourse({...course, title: e.target.value});
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
                                defaultValue={course?.description}
                                onChange={(e) => {
                                    setCourse({...course, description: e.target.value});
                                }}
                            />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="background">Gambar Latar Belakang</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="background"
                                        placeholder="Ex. Tentang Kami"
                                        onChange={(e) => {
                                            setCourse({...course, background: e.target.files[0]});
                                        }}
                                    />
                                </div>
                            </div>
                            {image && (
                                <div className="form-group">
                                    <label className="form-label" htmlFor="image">Gambar Background</label>
                                    <img className="rounded-5" src={image} alt="" />
                                </div>
                            )}
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
                                                <td><Button outline color={"danger"} size={"sm"} onClick={() => deleteCourse(item.title)}><Icon name={"trash"}/></Button></td>
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
                        <label className="form-label" htmlFor="subtitle">Singkatan</label>
                        <div className="form-control-wrap">
                            <input
                                type="type"
                                className="form-control"
                                id="subtitle"
                                onChange={(e) => {
                                    setContent({...content, subtitle: e.target.value});
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
                        <Button color="primary" onClick={() => addCourse()} size="md">SIMPAN</Button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default Course;