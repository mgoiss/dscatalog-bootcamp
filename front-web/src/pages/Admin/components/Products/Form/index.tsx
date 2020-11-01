import React, { useState } from 'react';
import { makePrivateRequest} from 'core/utils/request';
import BaseForm from '../../BaseForm';
import './styles.scss'

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '1',
        description: ''
    });

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://compass-ssl.xbox.com/assets/c8/9d/c89d04a8-ba6d-496d-aa7e-5b1cf0d60ea9.jpg?n=10202018_Panes-3-Up-0_Hero-SX_347x347.jpg',
            categories: [{id: formData.category}]
        }

        makePrivateRequest({ url: '/products', method: 'POST', data: payload})
        .then(() => {
            setFormData({name: '', category: '', price: '', description: ''});
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input
                            value={formData.name}
                            type="text"
                            name="name"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do produto"
                        />
                        <select 
                            value={formData.category} 
                            name="category" 
                            className="form-control mb-5" 
                            onChange={handleOnChange}
                        >
                            <option value="3">Computador</option>
                            <option value="1">Livro</option>
                            <option value="2">Eletrônico</option>
                        </select>
                        <input
                            type="text"
                            value={formData.price}
                            name="price"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                    </div>
                    <div className="col-6">
                        <textarea 
                            name="description" 
                            value={formData.description}
                            onChange={handleOnChange}
                            className="form-control"
                            cols={30} 
                            rows={10}
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;