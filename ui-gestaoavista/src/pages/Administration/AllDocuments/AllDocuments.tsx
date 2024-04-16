import { useEffect, useState } from "react";
import { DataTableElements, ElementRow } from "../../../components/TableTwo";
import Host, { Port } from "../../../LinkAPI";
import DefaultLayout from "../../../layout/DefaultLayout";
import DocumentAddDialog from "../../Common/Document/DocumentAddDialog";
import DocumentEditDialog from "../../Common/Document/DocumentEditDialog";
import DocumentDeleteDialog from "../../Common/Document/DocumentDeleteDialog";
import { AlertColor, Button, Skeleton } from "@mui/material";
import DataGridGTA from "../../../components/Table/DataGridGTA";
import Breadcrumb from "../../../components/Breadcrumb";
import IconSVG from "../../../components/IconSVG/IconSVG";
import { Search } from "@mui/icons-material";
import SearchAppBar from "../../../components/componentsGTA/Search";


function AllDocuments() {

    const [documentData, setDocumentData] = useState<DataTableElements<ElementRow>[]>([]);
    const [openAddDocument, setOpenAddDocument] = useState<boolean>(false);
    const [openEditDocument, setOpenEditDocument] = useState<boolean>(false);
    const [openDeleteDocument, setOpenDeleteDocument] = useState<boolean>(false);
    const [openDetailsDocument, setOpenDetailsDocument] = useState<boolean>(false);
    const [documentId, setDocumentId] = useState(0);
    const [search, setSearch] = useState('');
    const [columnNamesKey, setColumnsNameKey] = useState<string[]>([]);

    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? Number(userIdString) : 0;

    const getDocumentData = async () => {
        try {
            const response = await fetch(`${Host}${Port}/api/Document/GetAll`);
            const data = await response.json();
            setDocumentData(data);
            console.log("documents:", data);

        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleAddDocument = () => {
        setOpenAddDocument((cur) => !cur);
    }

    const handleCloseDocument = () => {
        setOpenAddDocument((cur) => !cur);
    }

    const handleEditDocument = () => {
        setOpenEditDocument((cur) => !cur);
    }

    const handleEditCloseDocument = () => {
        setOpenEditDocument((cur) => !cur);
    }

    const handleDeleteDocument = () => {
        setOpenDeleteDocument((cur) => !cur);
    }

    const handleDeleteCloseDocument = () => {
        setOpenDeleteDocument((cur) => !cur);
    }

    const handleDetailsDocument = () => {
        setOpenDetailsDocument((cur) => !cur);
    }

    const handleDetailsCloseDocument = () => {
        setOpenDetailsDocument((cur) => !cur);
    }

    const handleAddSubmit = () => {
        setOpenAddDocument((cur) => !cur);
        getDocumentData();
    }

    const handleEditSubmit = () => {
        setOpenEditDocument((cur) => !cur);
        getDocumentData();
    }

    const handleDeleteSubmit = () => {
        setOpenDeleteDocument((cur) => !cur);
        getDocumentData();
    }

    const handleRowSelect = (data: any) => {
        setDocumentId(data);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        getDocumentData();
    }, []);

    useEffect(() => {
        if (documentData.length > 0 && documentData[0].elements) {
            const columns = documentData[0].elements.map(e => e.column);
            setColumnsNameKey(columns);
        } else {
            console.error("Não foi possível extrair as colunas do userData");
        }
    }, [documentData]);


    return (
        <>

            <Breadcrumb pageName="Documentos dos Usuários" />

            {openAddDocument ? <DocumentAddDialog handleClose={handleCloseDocument} openAdd={openAddDocument} handleSubmit={handleAddSubmit}/> : <></>}
            {openEditDocument ? <DocumentEditDialog handleClose={handleEditCloseDocument} openAdd={openEditDocument} data={documentId} handleSubmit={handleEditSubmit} /> : <></>}
            {openDeleteDocument ? <DocumentDeleteDialog handleClose={handleDeleteCloseDocument} openAdd={openDeleteDocument} data={documentId} handleSubmit={handleDeleteSubmit} /> : <></>}
            {/* {openDetailsDocument ? <DocumentDetailsDialog handleClose={handleDetailsCloseDocument} openAdd={openDetailsDocument} data={documentId} handleSubmit={undefined} /> : <></>} */}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="mx-2 my-2">

                <SearchAppBar onChange={handleChange} />

                <Button variant="contained" size="large" color="success" onClick={handleAddDocument}>
                    <IconSVG src="src/images/icon/icon-add.svg" />
                    <span className="ml-2">Adicionar</span>
                </Button>
                
            </div>

            <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">
                {documentData.length > 0 ?
                    <DataGridGTA
                        sortOrder={'desc'}
                        fieldSort={'Id'}
                        isDelete={true}
                        isDetail={false}
                        isEdit={true}
                        handleDeleteButton={handleDeleteDocument}
                        handleEditButton={handleEditDocument}
                        handleDetailButton={handleDetailsDocument}
                        data={documentData}
                        pageSize={10}
                        pageSizeOptions={10}
                        idColumn={'Id'}
                        flex={1}
                        hiddenColumns={['Id']}
                        handleRowSelect={handleRowSelect}
                        search={search}
                        searchColumn={columnNamesKey}
                    />
                    : <Skeleton variant="rectangular" height={500} animation="wave" />
                }
            </div>

        </>

    )

}

export default AllDocuments;