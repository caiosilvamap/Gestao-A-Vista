import { Box, Button, Grid, Modal, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import MaterialBox, { ModelRef } from '../../componentsGTA/MaterialBox';
import MaterialList from '../../componentsGTA/MaterialList';
import MaterialAddDialog from '../../componentsGTA/MaterialAddDialog';
import MaterialEditDialog from '../../componentsGTA/MaterialEditDialog';

function Material() {
    const matRef = React.useRef<ModelRef>(null);
    const matRefList = React.useRef<ModelRef>(null);
    const [materialCode, setMaterialCode] = useState<string>('');
    const [openAdd, setOpenAdd] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [materialLoad, setMaterialLoad] = useState('');
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleMaterialClick = (data: string) => {
        setMaterialCode(data);
    }

    const handleAddButton = () => {
        setOpenAdd((cur) => !cur)
    }

    const handleOpenCloseEdit = () => {
        if (materialCode === '') {
            setOpenModal(true);
        }
        else {
            setOpenEdit((cur) => !cur)
        }
    }


    const handleAddClose = () => {
        setOpenAdd((cur) => !cur)
    }

    const handleSubmit = () => {
        setOpenAdd((cur) => !cur);
        if (matRefList.current) {
            matRefList.current.handleRefresh();
        }
    }

    const handleSubmitEdit = () => {
        setOpenEdit((cur) => !cur);

        if (matRef.current) {
            matRef.current.handleRefresh();
        }
    }


    return (
        <DefaultLayout>
            <Modal
                open={openModal}
                onClose={() => { setOpenModal((cur) => !cur) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 450,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Material não selecionado
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Selecione o material para editar
                    </Typography>
                </Box>
            </Modal>

            <Breadcrumb pageName="Materiais" />
            <div style={{ display: "flex", justifyContent: "flex-end" }} className="my-2" >
                {openAdd ? <MaterialAddDialog openAdd={openAdd} handleSubmit={handleSubmit} handleClose={handleAddClose}></MaterialAddDialog> : <></>}
                {openEdit ? <MaterialEditDialog handleSubmit={handleSubmitEdit} materialCode={materialCode} openEdit={handleOpenCloseEdit} handleClose={handleOpenCloseEdit} ></MaterialEditDialog> : <></>}
                <Button variant="contained" size="large" color="success" onClick={handleAddButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="mr-3" width="15px" height="15px" viewBox="0 0 32 32" version="1.1">

                        <title>plus</title>
                        <desc>Created with Sketch Beta.</desc>
                        <defs>

                        </defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                            <g id="Icon-Set-Filled" transform="translate(-362.000000, -1037.000000)" fill="#ffffff">
                                <path d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049" id="plus" >

                                </path>
                            </g>
                        </g>
                    </svg>
                    Adicionar
                </Button>
                <div className="mx-2"></div>
                <Button variant="contained" size="small" color="warning" onClick={handleOpenCloseEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 -0.5 21 21" version="1.1" className="mr-3">

                        <title>edit [#1479]</title>
                        <desc>Created with Sketch.</desc>
                        <defs>

                        </defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" fill="#ffffff">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]">

                                    </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    Editar
                </Button>
            </div>

            <div className="mt-8 ">
                <Grid container spacing={2}>
                    <Grid item md={2} >
                        <MaterialList materialLoad={materialLoad} handleMaterialClick={handleMaterialClick} ref={matRefList} />
                    </Grid>
                    <Grid item md={10} >
                        {materialCode === '' ? <Skeleton variant="rectangular" height={700} animation="wave" /> : <MaterialBox materialCode={materialCode} ref={matRef} />}
                       
                    </Grid>
                </Grid>
            </div>


        </DefaultLayout>
    );
}

export default Material;