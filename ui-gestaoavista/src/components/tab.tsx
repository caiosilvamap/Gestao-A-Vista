import React, { ReactNode } from "react";
import { useEffect, useState } from 'react';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { JsonToTable } from "./TableTwo";
import { useParams } from "react-router-dom";

interface TabDataTotalize<T> {
    elements: T[];
}

interface MaterialData {
    name: string;
    value: string;
}

interface TabData {
    label: string;
    value: string;
    desc: ReactNode;
}

function TabTotalize() {
    const { sinter } = useParams();
    let sinterId = sinter || '2';
    const [dataProd, setDataProd] = useState<TabDataTotalize<MaterialData>[]>([]);
    const [dataConsUmi, setDataConsUmi] = useState<TabDataTotalize<MaterialData>[]>([]);
    const [dataConsSec, setDataConsSec] = useState<TabDataTotalize<MaterialData>[]>([]);
    const [dataConsMes, setDataConsMes] = useState<TabDataTotalize<MaterialData>[]>([]);
    const [dataConsEsp, setDataConsEsp] = useState<TabDataTotalize<MaterialData>[]>([]);
    const [dataGas, setDataGas] = useState<TabDataTotalize<MaterialData>[]>([]);
    const storedDate = localStorage.getItem('selectedDate') || new Date().toLocaleString();
    

    sinterId += `&date=${storedDate}`

    useEffect(() => {
       
        const fetchDataProd = async () => {
            try {
                const response = await fetch('https://localhost:7297/api/totalizer/produc?sinter=' + sinterId);
                const data = await response.json();
                setDataProd(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchDataConsUmi = async () => {
            try {
                const response = await fetch('https://localhost:7297/api/totalizer/consumi?sinter=' + sinterId);
                const data = await response.json();
                setDataConsUmi(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchDataConsSec = async () => {
            try {
                const response = await fetch('https://localhost:7297/api/totalizer/conssec?sinter=' + sinterId);
                const data = await response.json();
                setDataConsSec(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchDataConsMes = async () => {
            try {
                const response = await fetch('https://localhost:7297/api/totalizer/consmes?sinter=' + sinterId);
                const data = await response.json();
                setDataConsMes(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchDataConsEsp = async () => {
            try {
                const response = await fetch('https://localhost:7297/api/totalizer/consesp?sinter=' + sinterId);
                const data = await response.json();
                setDataConsEsp(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchDataGas = async () => {
            try {
                const response = await fetch('https://localhost:7297/api/totalizer/gas?sinter=' + sinterId);
                const data = await response.json();
                setDataGas(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataGas();
        fetchDataProd();
        fetchDataConsSec();
        fetchDataConsUmi();
        fetchDataConsEsp();
        fetchDataConsMes();

    }, [sinterId]);

    
    const data: TabData[] = [
        {
            label: "Consumo Umido",
            value: "ConsumoUmido",
            desc: dataConsUmi ? (
                <JsonToTable data={dataConsUmi} />
            ) : (
                <p>Loading data...</p>
            )
        },
        {
            label: "Consumo Seco",
            value: "ConsumoSeco",
            desc: dataConsSec ? (
                <JsonToTable data={dataConsSec} />
            ) : (
                <p>Loading data...</p>
            )
        },
        {
            label: "Consumo Mes",
            value: "ConsumoMes",
            desc: dataConsMes ? (
                <JsonToTable data={dataConsMes} />
            ) : (
                <p>Loading data...</p>
            )
        }
        ,
        {
            label: "Produção",
            value: "prod",
            desc: dataProd ? (
                <JsonToTable data={dataProd} />
            ) : (
                <p>Loading data...</p>
            )

        }
        ,
        {
            label: "Consumo Especifico",
            value: "ConsumoEsp",
            desc: dataConsEsp ? (
                <JsonToTable data={dataConsEsp} />
            ) : (
                <p>Loading data...</p>
            )
        }
        ,
        {
            label: "Gas Natural",
            value: "GasNatural",
            desc: dataGas ? (
                <JsonToTable data={dataGas} />
            ) : (
                <p>Loading data...</p>
            )
        },];
    const [activeTab, setActiveTab] = React.useState(data[0].value);

    return (
        <Tabs value={activeTab}>
            <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                    className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                }}
            >
                {data.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={activeTab === value ? "text-blue-500" : ""}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}


export default TabTotalize;