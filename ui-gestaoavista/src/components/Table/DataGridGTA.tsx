import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridFeatureMode, GridLocaleText, GridRowModes, GridSortDirection, GridSortItem } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { DataTableElements, ElementRow } from './Table';
import dayjs from 'dayjs';

interface Props {
    data: DataTableElements<ElementRow>[];
    pageSize: number;
    pageSizeOptions: number;
    idColumn: string;
    hiddenColumns: string[];
    addColumns?: GridColDef[];
    handleRowSelect?: any;
    isEdit?: boolean;
    isDetail?: boolean;
    isDelete?: boolean;
    handleEditButton?: any;
    handleDetailButton?: any;
    handleDeleteButton?: any;
    fieldSort?: string;
    columnOrder?: string[];
    search: string;
    searchColumn?: string[];
    sortOrder?: GridSortDirection;
    columnsEnableEdit?: string[];
    processRowUpdateHandle?: any;
    flex?: number;

}

interface DataRow {
    [key: string]: number | boolean | string | null;
}

function tryParseDate(value: string): [boolean, Date] {
    let date = dayjs(value, "DD/MM/YYYY HH:mm");

    if (!isNaN(date.day())) {
        return [true, date.toDate()];
    } else {
        return [false, new Date];
    }
}


function transformDataToColumnsAndRows(data: DataTableElements<ElementRow>[], flex?: number, columnOrder?: string[]): { columns: GridColDef[]; rows: DataRow[] } {
    const columns: GridColDef[] = [];
    const rows: DataRow[] = [];

    if (data) {
        data.forEach((dataTableElement) => {
            const rowData: DataRow = {};
            if (dataTableElement.elements) {
                dataTableElement.elements.forEach((element) => {
                    rowData[element.column] = element.value;

                    let length = 80;

                    const [isDate, _] = tryParseDate(element.value);

                    if (isDate) {
                        length = 140;
                    } else if (element.column.toLowerCase().includes('status')) {
                        length = 120;
                    } else if (element.column.length > 10) {
                        length = element.column.length * 9;
                    }

                    const existingColumn = columns.find((col) => col.field === element.column);
                    if (!existingColumn) {
                        columns.push({
                            field: element.column,
                            headerName: element.column,
                            flex: flex || 0,
                            width: length,
                            minWidth: 80,
                        });
                    }
                });
            }
            rows.push(rowData);
        });
    }

    // Reorder the columns based on the specified order
    if (columnOrder) {
        columns.sort((a, b) => {
            const indexA = columnOrder.indexOf(a.field);
            const indexB = columnOrder.indexOf(b.field);
            return indexA - indexB;
        });
    }

    return { columns, rows };
}

function DataGridGTA({ data,
    flex,
    pageSize,
    pageSizeOptions,
    idColumn,
    hiddenColumns,
    columnsEnableEdit,
    addColumns,
    handleRowSelect,
    isEdit,
    handleEditButton,
    isDetail,
    handleDetailButton,
    isDelete,
    handleDeleteButton,
    fieldSort,
    sortOrder,
    columnOrder,
    search,
    searchColumn,
    processRowUpdateHandle }: Props) {

    let dataGridElements;

    if (columnOrder) {
        dataGridElements = transformDataToColumnsAndRows(data, flex, columnOrder);
    } else {
        dataGridElements = transformDataToColumnsAndRows(data, flex);
    }

    
    const getRowId = (row: DataRow) => row[idColumn]?.toString() || '';

    const [filteredData, setFilteredData] =useState<{ Id: number; }[]>([]);
    const [isFiltering, setIsFiltering] = useState(false);


    const renderSearch = () => {

        let filtredGridElements;

        const dataFiltered = data.filter(entry => {
            return entry.elements.some(element => {
                const columnValue = element.value !== null && element.value !== undefined ? element.value.toString().toLowerCase() : null;
                const searchValue = search.toLowerCase();
                return searchColumn?.includes(element.column) && columnValue !== null && columnValue.includes(searchValue);
            });
        });

        filtredGridElements = transformDataToColumnsAndRows(dataFiltered, flex);

        const filtredrowsWithNumberIds = filtredGridElements.rows.map(row => ({
            ...row,
            Id: Number(row.Id),
        }));

        setFilteredData(filtredrowsWithNumberIds);
        setIsFiltering(!!search);

    };

    

    if (isEdit) {
        const columns: GridColDef[] = [];

        columns.push({
            field: 'Editar',
            headerAlign: 'center',
            headerName: 'Editar',
            width: 80,
            renderCell: (params) => (
                <Button variant="outlined" size="small" color="warning" sx={{ height: '3vh' }} onClick={() => handleEditButton(params.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 0 21 21" version="1.1" className="">

                        <title>edit [#1479]</title>
                        <desc>Created with Sketch.</desc>
                        <defs>

                        </defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" fill="#ED6C02">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]">

                                    </path>
                                </g>
                            </g>
                        </g>
                    </svg>

                </Button>
            ),
        });

        dataGridElements.columns.push(...columns);
    }

    if (isDetail) {
        const columns: GridColDef[] = [];

        columns.push({
            field: 'Detalhes',
            headerName: 'Detalhes',
            headerAlign: 'center',
            width: 80,
            renderCell: (params) => (
                <Button variant="outlined" size="small" color="primary" sx={{ height: '3vh' }} onClick={() => handleDetailButton(params.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#2562E8" width="20px" height="20px" viewBox="0 0 32 32" id="Layer_1"><rect height="1" width="12" x="10" y="2" /><rect height="1" width="12" x="10" y="2" /><rect height="1" transform="translate(-9.5 22.5) rotate(-90)" width="20" x="-3.5" y="15.5" /><rect height="1" transform="translate(11.5 39.5) rotate(-90)" width="16" x="17.5" y="13.5" /><rect height="1" width="6" x="17" y="6" /><rect height="1" width="14" x="9" y="9" /><rect height="1" width="14" x="9" y="12" /><rect height="1" width="14" x="9" y="15" /><rect height="1" width="14" x="9" y="18" /><rect height="1" width="10" x="9" y="21" /><rect height="1" width="7" x="9" y="24" /><path d="M22,2V3h2a1,1,0,0,1,1,1V6h1V4a2,2,0,0,0-2-2Z" /><path d="M10,2V3H8A1,1,0,0,0,7,4V6H6V4A2,2,0,0,1,8,2Z" /><path d="M8,30V29H8a1,1,0,0,1-1-1V26H6v2a2,2,0,0,0,2,2Z" /><path d="M21.91,21.15c-.57-.32-.91-.72-.91-1.15a6.09,6.09,0,0,1-.21,1.59c-1,4.07-6,7.18-12.12,7.4H8v1h.72c8.86-.15,16.07-3.15,17.14-7A3.77,3.77,0,0,0,26,22,8.72,8.72,0,0,1,21.91,21.15Zm-5.78,7a10.5,10.5,0,0,0,5.54-6,8.94,8.94,0,0,0,3.15.79C24.07,25,20.91,27,16.13,28.13Z" /></svg>

                </Button>
            ),
        });

        dataGridElements.columns.push(...columns);
    }

    if (isDelete) {
        const columns: GridColDef[] = [];

        columns.push({
            field: 'Deletar',
            headerName: 'Deletar',
            headerAlign: 'center',
            width: 80,
            renderCell: (params) => (
                <Button variant='outlined' size="small" color="error" sx={{ height: '3vh' }} onClick={() => handleDeleteButton(params.id)}>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </Button>
            ),
        });
        dataGridElements.columns.push(...columns);
    }

    if (addColumns) {
        dataGridElements.columns.push(...addColumns);
    }
    const columnsWithHidden: GridColumnVisibilityModel = {};

    dataGridElements.columns.forEach((col) => {

        columnsWithHidden[col.field] = !hiddenColumns.some(e => e === col.field);
    });

    // width: col.field === 'Data de Chegada' || col.field === 'Data de Virada' || col.field === 'Quantidade de Vagoes' ? 200 : 100

    const rowsWithNumberIds = dataGridElements.rows.map(row => ({
        ...row,
        Id: Number(row.Id),
    }));

    if (columnsEnableEdit) {
        const columnWithEditable = dataGridElements.columns.map(col => ({
            ...col,
            editable: columnsEnableEdit?.some(e => e === col.field),
            type: 'number',
        }));
        dataGridElements.columns = columnWithEditable;
    }
    const [changedData, setChangedData] = useState([]);

    useEffect(() => {
        renderSearch();
    }, [search, searchColumn]);

    return (
        <Box sx={{ width: '100%' }}>

            <DataGrid className="dark:text-white"
                rows={isFiltering ? filteredData : rowsWithNumberIds}
                columns={dataGridElements.columns}
                editMode="row"
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: pageSize

                        },
                    },
                    sorting: {
                        sortModel: [{ field: fieldSort ? fieldSort : 'Id', sort: sortOrder }],
                    },

                }}
                loading={rowsWithNumberIds.length === 0}
                pageSizeOptions={[pageSizeOptions]}
                getRowId={getRowId}
                onRowClick={(e) => handleRowSelect(e.id)}
                columnVisibilityModel={columnsWithHidden}
                processRowUpdate={(updatedRow: any, originalRow: any) => {
                    processRowUpdateHandle(updatedRow, originalRow);
                }

                }

            />
        </Box>
    );
}
export default DataGridGTA;