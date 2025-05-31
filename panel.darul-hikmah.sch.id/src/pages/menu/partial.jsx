import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, Toast} from "../../components/index.jsx";
import {Controller, useForm} from "react-hook-form";
import {store as storeMenu, update as updateMenu} from "../../utils/api/menu.jsx"
import RSelect from "../../components/select/rselect.jsx";

const Partial = ({modal, setModal, menu, setMenu, setDataRefresh, parent}) => {
    const [loading, setLoading] = useState(false);
    const [parentOptions, setParentOptions] = useState([]);
    const {register, control, handleSubmit, setValue, reset, formState: {errors}} = useForm();
    const childOptions = [
        {value: 1, label: "Ya"},
        {value: 0, label: "Tidak"},
    ]
    const onSubmit = (data) => {
        setLoading(true);
        menu === null ? handleStore(data) : handleUpdate(data)
    }
    const handleStore = (data) => {
        storeMenu(data).then(() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const handleUpdate = (data) => {
        updateMenu(data).then(() => {
            setLoading(false);
            setDataRefresh(true);
            toggle();
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setMenu(null);
        reset();
    };

    useEffect(() => {
        setValue('id', menu?.id);
        setValue('parent', menu?.parent);
        setValue('name', menu?.name);
        setValue('link', menu?.link);
        setValue('child', menu?.child);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu]);

    useEffect(() => {
        const parents = parent.filter((item) => {
            return item.parent === 0;
        })
        const parentOptions = [{value: 0, label: 'Tanpa Parent'}]
        parents.map((item) => {
            parentOptions.push({value: item.id, label: item.name});
        })
        setParentOptions(parentOptions)
    }, [parent]);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }
            >
                {menu ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="role">Parent</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                className="form-control"
                                name="parent"
                                render={({field: {onChange, value, ref}}) => (
                                    <RSelect
                                        inputRef={ref}
                                        options={parentOptions}
                                        value={parentOptions?.find((c) => c.value === value)}
                                        onChange={(val) => onChange(val.value)}
                                        placeholder="Pilih Parent"
                                    />
                                )}/>
                            <input type="hidden" id="parent" className="form-control"/>
                            {errors.parent && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="nama">Nama</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. Sejarah"
                                {...register("name", {required: true})}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="nama">Tautan</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="link"
                                placeholder="Ex. https://salingsapa.com"
                                {...register("link", {required: true})}
                            />
                            {errors.link && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="child">Sub Menu</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                className="form-control"
                                name="child"
                                render={({field: {onChange, value, ref}}) => (
                                    <RSelect
                                        inputRef={ref}
                                        options={childOptions}
                                        value={childOptions.find((c) => c.value === value)}
                                        onChange={(val) => onChange(val.value)}
                                        placeholder="Pilih Submenu"
                                    />
                                )}/>
                            <input type="hidden" id="child" className="form-control"/>
                            {errors.child && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <Button color="primary" type="submit" size="md">
                            {loading ? <Spinner size="sm"/> : 'SIMPAN'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default Partial;
