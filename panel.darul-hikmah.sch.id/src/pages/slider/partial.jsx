import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {
    BlockBetween,
    BlockDes,
    BlockHead, BlockHeadContent,
    BlockTitle, Col, Icon, ImageContainer,
    PreviewCard, Row
} from "../../components/index.jsx";
import {Controller, useForm} from "react-hook-form";
import {store as storeSlider, update as updateSlider, show as showSlider} from "../../utils/api/slider.jsx"
import Head from "../../layout/head/index.jsx";
import Content from "../../layout/content/index.jsx";
import RSelect from "../../components/select/rselect.jsx";
import {useParams} from "react-router-dom";

const Partial = () => {
    const {id} = useParams()
    const [sm, updateSm] = useState(false);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [button, setButton] = useState([]);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [background, setBackground] = useState('');
    const [image, setImage] = useState('');
    const {register, control, handleSubmit, setValue, reset, formState: {errors}} = useForm();
    const statusOptions = [
        {value: '1', label: 'Aktif'},
        {value: '2', label: 'Tidak Aktif'},
    ]
    const onSubmit = (data) => {
        setLoading(true);
        id ? handleUpdate(data) : handleStore(data)
    }
    const handleStore = (data) => {
        storeSlider(data).then (() => {
            setBackground('')
            setImage('')
            setLoading(false);
            reset();
        }).catch(() => setLoading(false));
    }
    const handleUpdate = (data) => {
        updateSlider(data).then (() => {
            setLoading(false);
            toggle();
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setName("");
        setLink("");
    };
    const buttonTable = (e) => {
        return <Button
            color="danger"
            size="sm"
            outline
            onClick={() => {
                setButton(button => button.filter((item) => item.name !== e));
            }}
        >
            <Icon name="trash"/>
        </Button>
    }

    useEffect(() => {
        setValue('button', JSON.stringify(button));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [button])

    useEffect(() => {
        id && showSlider(id).then((resp) => {
            setValue('id', resp.id);
            setValue('title', resp.title);
            setValue('description', resp.description);
            setValue('status', resp.status);
            setButton(JSON.parse(resp.button));
            setBackground(resp.background);
            setImage(resp.image);
        })

        console.log(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return (
        <>
            <Head title={id ? "Perbarui Slider" : "Tambah Slider"} />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h3" page>
                                {id ? "Perbarui Slider" : "Tambah Slider"}
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Masukkan informasi slider</p>
                            </BlockDes>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <Button
                                    className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                    onClick={() => updateSm(!sm)}
                                >
                                    <Icon name="menu-alt-r"></Icon>
                                </Button>
                                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <Button color="primary" outline type="submit" size="md" onClick={handleSubmit(onSubmit)}>
                                                {loading ? <Spinner size="sm"/> : <><Icon name="save"/> <span>SIMPAN</span></> }
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <PreviewCard>
                    <Row className="mb-3">
                        <Col size="6">
                            <form className="is-alter">
                                <Row className="gy-3">
                                    <Col size="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="title">Judul</label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="title"
                                                    placeholder="Ex. PPDB TP. 2024/2025"
                                                    {...register("title", {required: true})}
                                                />
                                                {errors.title && <span className="invalid">Kolom tidak boleh kosong</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col size="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="about">Diskripsi</label>
                                            <div className="form-control-wrap">
                                                <textarea
                                                    className="form-control"
                                                    id="description"
                                                    {...register("description", {required: false})}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col size="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="role">Status</label>
                                            <div className="form-control-wrap">
                                                <Controller
                                                    control={control}
                                                    className="form-control"
                                                    name="status"
                                                    render={({field: {onChange, value, ref}}) => (
                                                        <RSelect
                                                            inputRef={ref}
                                                            options={statusOptions}
                                                            value={statusOptions.find((c) => c.value === value)}
                                                            onChange={(val) => onChange(val.value)}
                                                            placeholder="Pilih Status"
                                                        />
                                                    )}/>
                                                <input type="hidden" id="role" className="form-control" />
                                                {errors.status && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col size="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="background">Background</label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="background"
                                                    onChange={(e) => {
                                                        setValue('background', e.target.files[0]);
                                                        setBackground(URL.createObjectURL(e.target.files[0]));
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col size="12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="image">Gambar</label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="image"
                                                    onChange={(e) => {
                                                        setValue('image', e.target.files[0])
                                                        setImage(URL.createObjectURL(e.target.files[0]))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    {background && (
                                        <Col size="12">
                                            <label className="form-label" htmlFor="about">Gambar Background</label>
                                            <ImageContainer img={background}/>
                                        </Col>
                                    )}
                                </Row>
                            </form>
                        </Col>
                        <Col size="6">
                            <Row className="mb-3">
                                <Col size="12" className="mb-3 pt-10">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="about">Tombol Slider</label>
                                        <Col size="12">
                                            <div className="table-responsive">
                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr className="text-center">
                                                        <th>Nama</th>
                                                        <th>Link</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {button.map((item, idx) => (
                                                        <tr key={idx} className="text-center">
                                                            <td>{item.name}</td>
                                                            <td>{item.link}</td>
                                                            <td>{buttonTable(item.name)}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="text-center"><td colSpan="4"><span className="text-muted ff-italic">
                                                        <Button color={"light"} outline size={"sm"} onClick={() => setModal(true)}><Icon name={"plus"}/><span>Tambah</span></Button>
                                                    </span></td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Col>
                                    </div>
                                </Col>
                                {image && (
                                    <Col size="12" className="mt-3">
                                        <label className="form-label" htmlFor="about">Gambar Popup</label>
                                        <ImageContainer img={image}/>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </PreviewCard>
            </Content>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={
                    <button className="close" onClick={toggle}>
                        <Icon name="cross" />
                    </button>
                }
                >
                    TAMBAH TOMBOL
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label className="form-label" htmlFor="nama">Nama Tombol</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ex. Selengkapnya"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="link">Link Tombol</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ex. https://example.com/slider"
                                value={link}
                                onChange={(e) => {
                                    setLink(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button
                            color="primary"
                            type="submit"
                            size="md"
                            onClick={() => {
                                setButton([...button, {"name": name, "link": link}]);
                                toggle();
                            }}
                        >SIMPAN</Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default Partial;