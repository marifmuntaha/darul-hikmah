import React, {useEffect, useState} from "react";
import Dropzone from "react-dropzone";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon} from "../../components/index.jsx";
import {useForm} from "react-hook-form";
import {store as storeGallery, update as updateGallery} from "../../utils/api/gallery.jsx"

export const Partial = ({modal, setModal, gallery, setGallery, setDataRefresh}) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        setLoading(true);
        gallery === null ? handleStore(data) : handleUpdate(data)
    }
    const handleStore = (data) => {
        storeGallery(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false))}
    const handleUpdate = (data) => {
        updateGallery(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setGallery(null);
        setImages([]);
        reset();
    };

    const handleDropChange = (acceptedFiles, set) => {
        set(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    };

    useEffect(() => {
        gallery?.id && setValue('id', gallery.id)
        setValue('title', gallery?.title)
        setValue('content', gallery?.content)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gallery])

    useEffect(() => {
        setValue('images', images);
    }, [setValue, images]);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross" />
                </button>
                }
            >
                {gallery ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="title">Judul Galeri</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Ex. Acara Wisuda"
                                {...register("title", { required: true })}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="content">Konten</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="content"
                                {...register("content", { required: false })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="images">Gambar</label>
                        <Dropzone
                            onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setImages)}
                            acceptFiles={['jpg', 'jpeg', 'png']}
                            maxSize={1002400}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                                        <input {...getInputProps()} />
                                        {images.length === 0 && (
                                            <div className="dz-message">
                                                <span className="dz-message-text">Tahan dan Tarik Gambar</span>
                                                <span className="dz-message-or">or</span>
                                                <Button color="primary" type="button">PILIH</Button>
                                            </div>
                                        )}
                                        {images.map((file) => (
                                            <div key={file.name} className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                                                <div className="dz-image">
                                                    <img src={file.preview} alt="preview" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="form-group">
                        <Button color="primary" type="submit" size="md">
                            { loading ? <Spinner size="sm" /> : 'SIMPAN' }
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    )
}