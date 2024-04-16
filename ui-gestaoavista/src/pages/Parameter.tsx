import React, { FormEvent, ChangeEvent, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';


const frmNewParam = () => {
    const [name, setNome] = useState('');
    const [description, setDescription] = useState('');
    const [actualvalue, setActualValue] = useState('');
    const [minimumvalue, setMinimumValue] = useState('');
    const [maximumValue, setMaximuimValue] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Faça algo com os dados do formulário, como enviar para um servidor
        console.log('Nome:', name);
//        console.log('E-mail:', email);
    };

    return (
        <DefaultLayout>

            <form className="flex flex-col bg-white w-full p-5 sm:p-10 gap-8 rounded-md"  onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setNome(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </label>
                <label>
                    Valor atual:
                    <input
                        type="number"
                        value={actualvalue}
                        onChange={(event) => setActualValue(event.target.value)}
                    />
                </label>
                <label>
                    Valor mínimo:
                    <input
                        type="number"
                        value={minimumvalue}
                        onChange={(event) => setMinimumValue(event.target.value)}
                    />
                </label>
                <label>
                    Valor atual:
                    <input
                        type="number"
                        value={maximumValue}
                        onChange={(event) => setMaximuimValue(event.target.value)}
                    />
                </label>

                <br />
                <button type="submit">Enviar</button>
            </form>
        </DefaultLayout>

       
    );
};

export default frmNewParam;
