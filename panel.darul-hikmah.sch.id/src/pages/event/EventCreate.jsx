import React, {useEffect, useState} from "react";
import Head from "../../layout/head/index.jsx";
import Content from "../../layout/content/index.jsx";
import DatePicker from "react-datepicker";
import RSelect from "../../components/select/rselect.jsx";
import {
    Block,
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Col, DateInput,
    Icon,
    PreviewCard,
    QuillComponent,
    Row
} from "../../components/index.jsx";
import {store as storeEvent} from "../../utils/api/event.jsx"
import {Spinner} from "reactstrap";
import {get as getGalleries} from "../../utils/api/gallery.jsx"
import {setDateForPicker, todaysDate} from "../../utils/Utils.jsx";

const EventCreate = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('')
    const [placeholder, setPlaceholder] = useState('');
    const [content, setContent] = useState('');
    const [params, setParams] = useState({
        image: {},
        title: '',
        comment: '',
        location: '',
        start: todaysDate,
        end: todaysDate,
        gallery_id: null,
        placeholder: {}
    });
    const [gallery, setGallery] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const OnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        storeEvent(params).then (() => setLoading(false)).catch(() => setLoading(false));
    }

    useEffect(() => {
        setParams({...params, content: content})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content])

    useEffect(() => {
        getGalleries({type: 'select'}).then((resp) => {
            setGallery(resp);
        })
    }, [])

    return (
        <React.Fragment>
            <Head title={"Tambah Artikel"} />
            <Content>
                <BlockHead size="lg">
                    <div className="nk-block-head-sub"><span></span></div>
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle className="page-title">Tambah Event</BlockTitle>
                            <BlockDes>
                                <p>Isikan detail Event anda</p>
                            </BlockDes>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <Button
                                className="d-none d-sm-inline-flex"
                                color={"primary"}
                                outline
                                onClick={(e) => OnSubmit(e)}>
                                {loading ? <Spinner size={"sm"} /> : <><Icon name={"save"}/><span>Simpan</span></> }
                            </Button>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block>
                    <Row className={"gy-3"}>
                        <Col size={"8"}>
                            <PreviewCard>
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            placeholder="Judul Event"
                                            onChange={(e) => {
                                                setParams({...params, title: e.target.value});
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <QuillComponent setContent={setContent}/>
                                    </div>
                                </div>
                            </PreviewCard>
                            <PreviewCard>
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <RSelect
                                            options={gallery}
                                            value={gallery?.find((c) => c.value === params.gallery_id)}
                                            onChange={(val) => {
                                                setParams({...params, gallery_id: val.value});
                                                setGalleryImages(val.images)
                                            }}
                                            placeholder="Pilih Galeri"
                                        />
                                    </div>
                                </div>
                                {galleryImages?.map((item, idx) => (
                                    <img key={idx} className="rounded-5 w-100 mb-2" src={item} alt=""/>
                                ))}
                            </PreviewCard>
                        </Col>
                        <Col size={"4"}>
                            <PreviewCard>
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="location"
                                            placeholder="Lokasi"
                                            onChange={(e) => {
                                                setParams({...params, location: e.target.value});
                                            }}
                                        />
                                    </div>
                                </div>
                                <Row className={"gy-3"}>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="start">Tanggal Mulai</label>
                                        <div className="form-control-wrap">
                                            <div className="form-icon form-icon-left">
                                                <Icon name="calendar"></Icon>
                                            </div>
                                            <DatePicker
                                                selected={start}
                                                className="form-control date-picker"
                                                onChange={(e) => {
                                                    setStart(e)
                                                    setParams({...params, start: setDateForPicker(e)});
                                                }}
                                                dateFormat={"dd/MM/YYYY"}
                                                customInput={<DateInput />}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="start">Tanggal Selesai</label>
                                        <div className="form-control-wrap">
                                            <div className="form-icon form-icon-left">
                                                <Icon name="calendar"></Icon>
                                            </div>
                                            <DatePicker
                                                selected={end}
                                                className="form-control date-picker"
                                                onChange={(e) => {
                                                    setEnd(e)
                                                    setParams({...params, end: setDateForPicker(e)});
                                                }}
                                                dateFormat={"dd/MM/YYYY"}
                                                customInput={<DateInput />}
                                            />
                                        </div>
                                    </div>
                                </Row>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="image">Gambar Utama</label>
                                    <div className="form-control-wrap">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="image"
                                            onChange={(e) => {
                                                setImage(URL.createObjectURL(e.target.files[0]));
                                                setParams({...params, image: e.target.files[0]});
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    {image && (
                                        <img className="rounded-5 w-100" src={image} alt="" />
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="placeholder">Placeholder</label>
                                    <div className="form-control-wrap">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="placeholder"
                                            onChange={(e) => {
                                                setPlaceholder(URL.createObjectURL(e.target.files[0]))
                                                setParams({...params, placeholder: e.target.files[0]});
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    {placeholder && (
                                        <img className="rounded-5 w-100" src={placeholder} alt="" />
                                    )}
                                </div>
                            </PreviewCard>
                        </Col>
                    </Row>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default EventCreate;