import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon} from "../../components/index.jsx";
import {useForm} from "react-hook-form";
import {store as storeTag, update as updateTag} from "../../utils/api/tag.jsx"

export const Partial = ({modal, setModal, tag, setTag, setDataRefresh}) => {
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        setLoading(true);
        tag === null ? handleStore(data) : handleUpdate(data)
    }
    const handleStore = (data) => {
        storeTag(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        })
    }
    const handleUpdate = (data) => {
        updateTag(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        })
    }
    const toggle = () => {
        setModal(false);
        setTag(null);
        reset();
    };

    useEffect(() => {
        setValue('id', tag?.id)
        setValue('name', tag?.name)
        setValue('description', tag?.description)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tag])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross" />
                </button>
                }
            >
                {tag ? 'UBAH' : 'TAMBAH'}
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
                                placeholder="Ex. Sejarah"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
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
                        <Button color="primary" type="submit" size="md">
                            { loading ? <Spinner size="sm" /> : 'SIMPAN' }
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    )
}
