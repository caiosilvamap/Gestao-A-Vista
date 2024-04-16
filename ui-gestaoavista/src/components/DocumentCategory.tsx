import { useEffect, useState } from "react";
import { DataTableElements, ElementRow } from "./Table/Table";
import Host, { Port } from "../LinkAPI";
import { Button, Skeleton, Typography } from "@mui/material";
import DataGridGTA from "./Table/DataGridGTA";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import IconSVG from "./IconSVG/IconSVG";
import DocumentCategoryAddDialog from "./DocumentCategoryAddDialog";
import DocumentCategoryEditDialog from "./DocumentCategoryEditDialog";
import DocumentCategoryDeleteDialog from "./DocumentCategoryDeleteDialog";

function DocumentCategory() {
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [documentCategoryId, setDocumentDataCategoryId] = useState(0)
    const [dataDocumentCategory, setDocumentDataCategory] = useState<DataTableElements<ElementRow>[]>([]);


    const handleAddDocumentCategory = () => {
        setOpenAdd((cur) => !cur);
    }

    const handleCloseDocumentCategory = () => {
        setOpenAdd((cur) => !cur);
    }

    const handleEditDocumentCategory = () => {
        setOpenEdit((cur) => !cur);
    }

    const handleEditCloseDocumentCategory = () => {
        setOpenEdit((cur) => !cur);
    }

    const handleSubmit = () => {
        setOpenAdd((cur) => !cur);
        fetchDataDocumentCategory()
    }

    const handleDeleteSubmit = () => {
        setOpenDelete((cur) => !cur);
        fetchDataDocumentCategory();
    }
    const handleCloseDeleteDocumentCategory = () => {
        setOpenDelete((cur) => !cur);
    }

    const handleEditSubmit = () => {
        setOpenEdit((cur) => !cur);
        fetchDataDocumentCategory();
    }


    const fetchDataDocumentCategory = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/DocumentCategory/GetAllToTable`)
            const data = await response.json();
            setDocumentDataCategory(data);
        } catch (error) {
            console.log('Error fetchin data:', error);
        }
    }

    const handleRowSelect = (data: any) => {
        setDocumentDataCategoryId(data);
    }

    useEffect(() => {
        fetchDataDocumentCategory();
    }, []);

    return (
        <Grid2 md={4} sm={6} xs={12}>
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                {openAdd ? <DocumentCategoryAddDialog openAdd={openAdd} handleClose={handleCloseDocumentCategory} handleSubmit={handleSubmit}></DocumentCategoryAddDialog> : <></>}
                {openEdit ? <DocumentCategoryEditDialog openAdd={openEdit} data={documentCategoryId} handleClose={handleEditDocumentCategory} handleSubmit={handleEditSubmit} ></DocumentCategoryEditDialog> : <></>}
                {/* {openDelete ? <DocumentCategoryDeleteDialog openAdd={openDelete} data={documentCategoryId} handleClose={handleCloseDeleteDocumentCategory} handleSubmit={handleDeleteSubmit}></DocumentCategoryDeleteDialog>: <></>} */}
                <h1 className="text-center mb-4 font-semibold text-black dark:text-white">
                    Categoria do Documento
                </h1>

                <div style={{ display: "flex", justifyContent: "flex-end" }} className="" >

                    <Button variant="contained" size="small" color="success" onClick={handleAddDocumentCategory}>
                        <IconSVG src="src/images/icon/icon-add.svg" />
                        <span className="ml-2">Adicionar</span>
                    </Button>
                </div>

                <div className="my-2"></div>
                {dataDocumentCategory.length > 0 ?
                    <DataGridGTA data={dataDocumentCategory} pageSize={10} pageSizeOptions={10} handleRowSelect={handleRowSelect} idColumn={'Id'} hiddenColumns={['Id']}  isEdit={true} flex={1} handleEditButton={handleEditCloseDocumentCategory} search={""} /> :
                    <Skeleton variant="rectangular" height={250} animation="wave" />
                }

            </div>
        </Grid2>
    );
}
export default DocumentCategory;