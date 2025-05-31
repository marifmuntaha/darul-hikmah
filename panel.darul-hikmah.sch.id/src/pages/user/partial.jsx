import React, {useEffect, useState} from "react";
import {Button, Input, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Icon, Row} from "../../components/index.jsx";
import {Controller, useForm} from "react-hook-form";
import {store as storeUser, update as updateUser} from "../../utils/api/user.jsx"
import RSelect from "../../components/select/rselect.jsx";

const Partial = ({modal, setModal, user, setUser, setDataRefresh}) => {
    const [loading, setLoading] = useState(false);
    const {register, control, handleSubmit, setValue, reset, formState: {errors}} = useForm();
    const roleOptions = [
        {value: '1', label: 'Administrator'},
        {value: '2', label: 'Penulis'},
        {value: '3', label: 'Editor'},
    ]
    const onSubmit = (data) => {
        setLoading(true);
        user === null ? handleStore(data) : handleUpdate(data)
    }
    const handleStore = (data) => {
        storeUser(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const handleUpdate = (data) => {
        updateUser(data).then (() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setUser(null);
        reset();
    };

    useEffect(() => {
        setValue('id', user?.id)
        // noinspection JSUnresolvedReference
        setValue('fullName', user?.fullName)
        // noinspection JSUnresolvedReference
        setValue('email', user?.email)
        setValue('role', user?.role)
        // noinspection JSUnresolvedReference
        setValue('facebook', user?.facebook)
        // noinspection JSUnresolvedReference
        setValue('instagram', user?.instagram)
        // noinspection JSUnresolvedReference
        setValue('twitter', user?.twitter)
        setValue('about', user?.about)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross" />
                </button>
                }
            >
                {user ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="fullName">Nama</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                placeholder="Ex. Muhammad Arif Muntaha"
                                {...register("fullName", { required: true })}
                            />
                            {errors.fullName && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Alamat Email</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Ex. marifmuntaha@gmail.com"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <Row className="mb-3">
                        <Col size="6">
                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Kata Sandi</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Ex. *******"
                                        {...register("password", { required: user === null })}
                                    />
                                    {errors.password && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                        <Col size="6">
                            <div className="form-group">
                                <label className="form-label" htmlFor="password_confirmation">Kata Sandi</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password_confirmation"
                                        placeholder="Ex. *******"
                                        {...register("password_confirmation", { required: user === null })}
                                    />
                                    {errors.password_confirmation && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="form-group">
                        <label className="form-label" htmlFor="role">Hak Akses</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                className="form-control"
                                name="role"
                                render={({field: {onChange, value, ref}}) => (
                                    <RSelect
                                        inputRef={ref}
                                        options={roleOptions}
                                        value={roleOptions.find((c) => c.value === value)}
                                        onChange={(val) => onChange(val.value)}
                                        placeholder="Pilih Hak Akses"
                                    />
                                )}/>
                            <input type="hidden" id="role" className="form-control" />
                            {errors.role && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                    <Row className="mb-3">
                        <Col size="4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="facebook">Facebook</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="facebook"
                                        placeholder="Ex. @marifmuntaha"
                                        {...register("facebook", { required: true })}
                                    />
                                    {errors.facebook && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                        <Col size="4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="instagram">Instagram</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="instagram"
                                        placeholder="@marifmuntaha"
                                        {...register("instagram", { required: true })}
                                    />
                                    {errors.instagram && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                        <Col size="4">
                            <div className="form-group">
                                <label className="form-label" htmlFor="twitter">Twitter/X</label>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="twitter"
                                        placeholder="Ex. @marifmuntaha"
                                        {...register("twitter", { required: true })}
                                    />
                                    {errors.twitter && <span className="invalid">Kolom tidak boleh kosong</span>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="form-group">
                        <label className="form-label" htmlFor="about">Diskripsi Singkat</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="about"
                                {...register("about")}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="image">Photo</label>
                        <div className="form-control-wrap">
                            <Input
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

export default Partial;
