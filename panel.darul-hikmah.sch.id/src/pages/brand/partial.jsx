import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, Toast} from "../../components/index.jsx";
import {useForm} from "react-hook-form";
import {store as storeBrand, update as updateBrand} from "../../utils/api/brand.jsx"

export const Partial = ({modal, setModal, brand, setBrand, setDataRefresh}) => {
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        setLoading(true);
        brand === null ? handleStore(data) : handleUpdate(data)
    }
    const handleStore = (data) => {
        storeBrand(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const handleUpdate = (data) => {
        updateBrand(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setBrand(null);
        reset();
    };

    useEffect(() => {
        brand !== null && setValue('id', brand.id)
        setValue('link', brand?.link)
        setValue('name', brand?.name)
        setValue('description', brand?.description)
        setValue('image', brand?.image)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brand])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross" />
                </button>
                }
            >
                {brand ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="nama">Nama</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. DH MART"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="link">Tautan</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="link"
                                placeholder="Ex. https://dhmedia.darul-hikmah.sch.id"
                                {...register("link", { required: true })}
                            />
                            {errors.link && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="about">Diskripsi</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                {...register("description", { required: false })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="image">Logo</label>
                        <div className="form-control-wrap">
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                onChange={(e) => {
                                    setValue('image', e.target.files[0]);
                                }}
                            />
                        </div>
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