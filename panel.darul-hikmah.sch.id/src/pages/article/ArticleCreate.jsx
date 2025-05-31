import React, {useEffect, useState} from "react";
import Head from "../../layout/head/index.jsx";
import Content from "../../layout/content/index.jsx";
import RSelect from "../../components/select/rselect.jsx";
import {
    Block,
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Col,
    Icon,
    PreviewCard,
    QuillComponent,
    Row
} from "../../components/index.jsx";
import {Partial as CategoryPartial} from "../category/partial.jsx"
import {Partial as TagPartial} from "../tag/partial.jsx";
import {get as getCategories} from "../../utils/api/category.jsx";
import {get as getTags} from "../../utils/api/tag.jsx";
import {store as storeArticle} from "../../utils/api/article.jsx"
import {Spinner} from "reactstrap";
import {APICore} from "../../utils/api/APICore.jsx";

const ArticleCreate = () => {
    const api = new APICore();
    const user = api.getLoggedInUser();
    const [loading, setLoading] = useState(false);
    const [categoryRefresh, setCategoryRefresh] = useState(true)
    const [modalCategory, setModalCategory] = useState(false);
    const [tagRefresh, setTagRefresh] = useState(true);
    const [modalTag, setModalTag] = useState(false);
    const [image, setImage] = useState('')
    const [placeholder, setPlaceholder] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [params, setParams] = useState({
        background: {},
        image: {},
        user_id: user.id,
        category_id: '',
        title: '',
        slug: slug,
        content: "",
        comment: '',
        status: '',
        tags: []
    })
    const statusOptions = [
        {value: '1', label: 'Terbit'},
        {value: '2', label: 'Draft'},
    ]
    const commentOptions = [
        {value: '1', label: 'Ya'},
        {value: '2', label: 'Tidak'},
    ]

    const OnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        params.tags = JSON.stringify(params.tags);
        storeArticle(params).then (() => setLoading(false)).catch(() => setLoading(false))
    }

    useEffect(() => {
        categoryRefresh && getCategories({type: 'select'}).then((result) => {
            setCategories(result);
            setCategoryRefresh(false);
        })
        tagRefresh && getTags({type: 'select'}).then((result) => {
            setTags(result);
            setTagRefresh(false);
        })
    }, [categoryRefresh, tagRefresh])

    useEffect(() => {
        setParams({...params, content: content})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content])

    return (
        <React.Fragment>
            <Head title={"Tambah Artikel"} />
            <Content>
                <BlockHead size="lg">
                    <div className="nk-block-head-sub"><span></span></div>
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle className="page-title">Tambah Artikel</BlockTitle>
                            <BlockDes>
                                <p>Masukkan Informasi Artikel</p>
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
                                            placeholder="Judul Artikel"
                                            onChange={(e) => {
                                                const slug = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "-").toLowerCase()
                                                setParams({...params, title: e.target.value, slug: slug});
                                                setSlug(slug);
                                            }}
                                        />
                                        <label className="fw-medium ff-italic ms-2 mt-1">Slug: </label>
                                        <label className="ff-italic">{slug}</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <QuillComponent setContent={setContent}/>
                                    </div>
                                </div>
                            </PreviewCard>
                            <PreviewCard>
                                <BlockBetween>
                                    <BlockHeadContent>
                                        <Button outline color="info" size={"md"} onClick={() => setModalCategory(true)}><Icon name={"plus"}/> <span>Kategori</span> </Button>
                                    </BlockHeadContent>
                                    <BlockHeadContent>
                                        <Button outline color="info" size={"md"} onClick={() => setModalTag(true)}><Icon name={"plus"} /> <span>Tagar</span> </Button>
                                    </BlockHeadContent>
                                </BlockBetween>
                            </PreviewCard>
                        </Col>
                        <Col size={"4"}>
                            <PreviewCard>
                                <Row className={"gy-3"}>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="category">Status</label>
                                        <div className="form-control-wrap">
                                            <RSelect
                                                options={statusOptions}
                                                value={statusOptions?.find((c) => c.value === params.status)}
                                                onChange={(e) => {
                                                    setParams({...params, status: e.value});
                                                }}
                                                placeholder="Pilih Status"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="comment">Komentar</label>
                                        <div className="form-control-wrap">
                                            <RSelect
                                                options={commentOptions}
                                                value={commentOptions?.find((c) => c.value === params.comment)}
                                                onChange={(val) => {
                                                    setParams({...params, comment: val.value});
                                                }}
                                                placeholder="Pilih Komentar"
                                            />
                                        </div>
                                    </div>
                                </Row>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="category">Kategori</label>
                                    <div className="form-control-wrap">
                                        <RSelect
                                            options={categories}
                                            value={categories?.find((c) => c.value === params.category_id)}
                                            onChange={(val) => {
                                                setParams({...params, category_id: val.value});
                                            }}
                                            placeholder="Pilih Kategori"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="tag">Tagar</label>
                                    <div className="form-control-wrap">
                                        <RSelect
                                            options={tags}
                                            value={params.tags}
                                            onChange={(val) => {
                                                setParams({...params, tags: val});
                                            }}
                                            placeholder="Pilih beberapa Tagar"
                                            isMulti
                                        />
                                    </div>
                                </div>
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
            <CategoryPartial modal={modalCategory} setModal={setModalCategory} category={null} setCategory={() => []} setDataRefresh={setCategoryRefresh} />
            <TagPartial modal={modalTag} setModal={setModalTag} tag={null} setTag={() => []} setDataRefresh={setTagRefresh} />
        </React.Fragment>
    )
}

export default ArticleCreate;