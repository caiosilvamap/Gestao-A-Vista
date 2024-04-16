import "./stylesedit.css";
import React from 'react';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DataTableElements<ElementRow> {
    elements: ElementRow[];
}

interface ElementRow {
    column: string;
    value: any;
}
interface JsonToTableProps<T> {
    data: DataTableElements<T>[];
    showDetails?: boolean;
    showEdit?: boolean;
    sinter?: string;
    Title?: string;
    ExcludeColumns?: string[];
    Type?: string;
    Search?: boolean;
    Pagination?: boolean;
    SearchColumn?: string;
    DateTimerPicker?: boolean;
    handleDateChange?: any;
    handleEditClick?: any;
    columnNames?: any;
}

interface State {
    selectedDate: Dayjs;
    waiting: boolean;
    dataFilter: DataTableElements<ElementRow>[];
    displayedData: DataTableElements<ElementRow>[];
    currentPage: number;
    noData: boolean;
}

class JsonToTable extends React.Component<JsonToTableProps<ElementRow>, State> {
    timer: NodeJS.Timeout | null = null;
    constructor(props: JsonToTableProps<ElementRow>) {
        super(props);
        this.state = {
            selectedDate: dayjs(),
            waiting: false,
            dataFilter: [],
            displayedData: [],
            currentPage: 1,
            noData: false,
        };
    }

    getHeader(): string[] {
        const { data } = this.props;
        if (!data || data.length === 0 || !data[0].elements) {
            return [];
        }

        const headers = [...data[0].elements.map(element => element.column)];

        return headers;
    }

    runtimeout() {

        this.timer = setTimeout(() => {
            this.setState({ noData: true });
        }, 2000);
    }

    cleanTimeout() {
        this.setState({ noData: false });
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
            this.setState({ noData: true });
        }, 2000);

    }

    handleDateChanged = (date: dayjs.Dayjs | null) => {
        if (date) {
            const dateAsDate = date.toDate();
            this.props.handleDateChange(dateAsDate);
            this.cleanTimeout();
        }
    };


    renderDateTimerPicker() {

        const valueAsDayjs = localStorage.getItem('selectedDateBegin') ? dayjs(localStorage.getItem('selectedDateBegin')) : dayjs();

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                    <DateTimePicker
                        className="dark:bg-white dark:bg-opacity-70"
                        value={valueAsDayjs}
                        onChange={(date: dayjs.Dayjs | null) => this.handleDateChanged(date)}
                        maxDate={dayjs()}
                        views={["year", "month", "day"]}
                        format="DD/MM/YYYY"
                    />
                </div>
            </LocalizationProvider>
        );
    }

    renderSearch() {
        const { data, SearchColumn } = this.props;
        const handleChangeSearch = (text: string) => {

            let filterData = data.filter(e => e.elements.find(element => element.column === SearchColumn)?.value.toString().includes(text));
            if (text.includes("/")) {
                filterData = data.filter(e => e.elements.find(element => element.column === 'Data')?.value.toString().includes(text));
            }

            this.setState({ dataFilter: filterData });

        };
        return (<div className="mb-3" style={{ width: '20rem' }}>
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Procurar"
                    aria-label="Search"
                    aria-describedby="button-addon1"
                    onChange={e => handleChangeSearch(e.target.value)} />

                <button
                    className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                    type="button"
                    id="button-addon1"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>);

    }

    componentDidUpdate(prevProps: JsonToTableProps<ElementRow>, prevState: State) {
        const { dataFilter, currentPage } = this.state;
        const ITEMS_PER_PAGE = 10;
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        if (prevState.currentPage !== this.state.currentPage || prevState.dataFilter !== this.state.dataFilter) {

            const displayedDataPagination = dataFilter.length > 0 ? dataFilter.slice(startIndex, endIndex) : prevProps.data.slice(startIndex, endIndex);

            this.setState({ displayedData: displayedDataPagination });
        }

        if (prevProps.data !== this.props.data) {
            this.setState({ displayedData: [] });
        }
    }

    renderPagination() {
        const { currentPage } = this.state;

        const totalPages = Math.ceil(this.props.data.length / 10);

        const handlePageChange = (pageNumber: number) => {

            this.componentDidUpdate(this.props, this.state);
            this.setState({ currentPage: pageNumber });
        };

        return (<div className="flex justify-between items-center gap-8 pt-4" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <IconButton
                size="sm"
                variant="outlined"
                color="blue-gray"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 " />
            </IconButton>
            <Typography color="gray" className="font-normal">
                Page <strong className="text-blue-gray-900">{currentPage}</strong> of{" "}
                <strong className="text-blue-gray-900">{totalPages}</strong>
            </Typography>
            <IconButton
                size="sm"
                variant="outlined"
                color="blue-gray"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
        </div>);
    }

    renderTableHeader() {
        const { showDetails, showEdit } = this.props;
        const headers = this.getHeader();

        if (showDetails) {
            headers.push("Detalhes");
        }

        if (showEdit) {
            headers.push("Editar");
        }

        return (
            <thead >
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">{header}</th>
                    ))}
                </tr>
            </thead>
        );
    }

    getRows(): string[][] {
        const { data } = this.props;

        const result = data.map((e) => (
            e.elements.map((element) => (
                element.value
            )).toString().split(',')
        ))

        return result;
    }

    renderTableRows() {
        const { displayedData } = this.state;

        let classes = "";
        const { data, showDetails, showEdit, Type, Pagination, handleEditClick, columnNames } = this.props;

        let dataDisplay;

        if (!data || data.length === 0 || !data[0].elements) {
            return null;
        }
        switch (Type) {
            case 'minus':
                classes = "p-0.2 px-1.5"
                break;
            default:
                classes = "p-2.5 border-b border-blue-gray-50 ";
                break;
        }

        if (Pagination) {
            if (displayedData.length <= 0) {
                this.setState({ displayedData: data.slice(0, 10) });
            }
            dataDisplay = displayedData;
        } else {
            dataDisplay = data;
        }

        const handleEditClickWithRowData = (rowData: any) => {
            handleEditClick(rowData);
        }

        return (
            <tbody>
                {dataDisplay.map((data, index) => {
                    const rowData: any = {};

                    if (showEdit) {
                        columnNames.forEach((columnName: string) => {
                            rowData[columnName] = data.elements.find((e) => e.column === columnName)?.value;
                        });
                    }

                    return (
                        <tr key={index} className="even:bg-meta-9/90 dark:even:bg-meta-2/25" >
                            {data.elements.map((element, index) => (
                                <td className={classes} key={index}>{element.value}</td>
                            ))}

                            {showDetails ? (
                                <td className={classes}>
                                    <Link to={`/details/${data.elements.find(e => e.column === 'Id')?.value}`}>
                                        Detalhes
                                    </Link>
                                </td>
                            ) : null}

                            {showEdit ? (
                                <td className={classes}>
                                    <button onClick={() => handleEditClickWithRowData(rowData)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 -0.5 21 21" version="1.1">

                                            <title>edit [#1479]</title>
                                            <desc>Created with Sketch.</desc>
                                            <defs>

                                            </defs>
                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" fill="#000000">
                                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                                        <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]">

                                                        </path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </button>
                                </td>
                            ) : null}

                        </tr>
                    );
                })}
            </tbody>
        )
    }

    render() {
        const { waiting } = this.state;
        const { Title, sinter, data, Pagination, Search, DateTimerPicker } = this.props;
        const tableData = [this.getHeader()];
        tableData.push(...this.getRows());

        const { noData } = this.state;

        function convertToWorksheet(data: string[][]) {
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            return worksheet;
        }

        const exportToXLSX = (data: string[][], filename: string) => {


            const workbook = XLSX.utils.book_new();
            const worksheet = convertToWorksheet(data);

            try {
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

                const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${filename}.xlsx`;

                link.click();
            } catch (error) {
                console.log("Erro ao gerar relat�rio:", error);
            } finally {
                setTimeout(() => {
                    this.setState({ waiting: false });
                }, 1000);

            }
        }

        const handleClickDownload = () => {
            this.setState({ waiting: true }); // Set waiting to true before exporting
            exportToXLSX(tableData, Title ? 'Dados ' + Title + '_' + new Date().toLocaleDateString() : 'table_data');

        }

        if (data.length > 0) {
            return (
                <>
                    {DateTimerPicker == true ? <div className="my-2"> {this.renderDateTimerPicker()} </div> : <></>}
                    {Search == true ? this.renderSearch() : <></>}
                    <div className="rounded-lg border border-stroke bg-white py-4 px-4 shadow-default dark:border-strokedark dark:bg-boxdark mb-4">

                        {Title && <h4 className="text-title-sm font-bold text-black dark:text-white ">{Title} {sinter ? 'Sinter' : ''} {sinter}</h4>}
                        <div className="flex justify-end">
                            {waiting ? <><div className="px-2 py-1"><div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary border-t-transparent "></div></div></> : ''}
                            <a className="flex" href="#" onClick={handleClickDownload}>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="25px" height="25px" viewBox="0 0 32 32"><defs><linearGradient id="a" x1="4.494" y1="-2092.086" x2="13.832" y2="-2075.914" gradientTransform="translate(0 2100)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#18884f" /><stop offset="0.5" stopColor="#117e43" /><stop offset="1" stopColor="#0b6631" /></linearGradient></defs><title>file_type_excel</title>
                                    <path d="M19.581,15.35,8.512,13.4V27.809A1.192,1.192,0,0,0,9.705,29h19.1A1.192,1.192,0,0,0,30,27.809h0V22.5Z" style={{ fill: '#185c37' }} />
                                    <path d="M19.581,3H9.705A1.192,1.192,0,0,0,8.512,4.191h0V9.5L19.581,16l5.861,1.95L30,16V9.5Z" style={{ fill: '#21a366' }} />
                                    <path d="M8.512,9.5H19.581V16H8.512Z" style={{ fill: '#107c41' }} />
                                    <path d="M16.434,8.2H8.512V24.45h7.922a1.2,1.2,0,0,0,1.194-1.191V9.391A1.2,1.2,0,0,0,16.434,8.2Z" style={{ opacity: 0.10000000149011612, isolation: 'isolate' }} />
                                    <path d="M15.783,8.85H8.512V25.1h7.271a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.783,8.85Z" style={{ opacity: 0.20000000298023224, isolation: 'isolate' }} />
                                    <path d="M15.783,8.85H8.512V23.8h7.271a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.783,8.85Z" style={{ opacity: 0.20000000298023224, isolation: 'isolate' }} />
                                    <path d="M15.132,8.85H8.512V23.8h6.62a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.132,8.85Z" style={{ opacity: 0.20000000298023224, isolation: 'isolate' }} />
                                    <path d="M3.194,8.85H15.132a1.193,1.193,0,0,1,1.194,1.191V21.959a1.193,1.193,0,0,1-1.194,1.191H3.194A1.192,1.192,0,0,1,2,21.959V10.041A1.192,1.192,0,0,1,3.194,8.85Z" style={{ fill: ' url(#a)' }} />
                                    <path d="M5.7,19.873l2.511-3.884-2.3-3.862H7.758L9.013,14.6c.116.234.2.408.238.524h.017c.082-.188.169-.369.26-.546l1.342-2.447h1.7l-2.359,3.84,2.419,3.905H10.821l-1.45-2.711A2.355,2.355,0,0,1,9.2,16.8H9.176a1.688,1.688,0,0,1-.168.351L7.515,19.873Z" style={{ fill: '#fff' }} />
                                    <path d="M28.806,3H19.581V9.5H30V4.191A1.192,1.192,0,0,0,28.806,3Z" style={{ fill: '#33c481' }} /><path d="M19.581,16H30v6.5H19.581Z" style={{ fill: '#107c41' }} />
                                </svg>
                                Download</a>
                        </div>
                        <div className="overflow-x-scroll px-0 scroll-smooth custom-scrollbar">
                            <table className="w-full min-w-max table-auto text-left">
                                {this.renderTableHeader()}
                                {this.renderTableRows()}
                            </table>
                        </div>
                        {Pagination == true ? this.renderPagination() : <></>}
                    </div></>
            );
        } else {
            this.runtimeout();
            if (noData) {
                return (
                    <>
                        {DateTimerPicker ?
                            <>
                                <div className="my-2"> {this.renderDateTimerPicker()}</div>
                                <h2>Não há dados para o dia selecionado</h2>
                            </>
                            :
                            <h2>Não há dados</h2>
                        }

                    </>);


            } else {
                return (
                    <>
                        {DateTimerPicker == true ? <div className="my-2"> {this.renderDateTimerPicker()} </div> : <></>}


                        <div className="flex justify-center">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary border-t-transparent " />
                        </div>
                    </>);
            }
        }
    }
}

export { JsonToTable };
export type { DataTableElements, ElementRow };