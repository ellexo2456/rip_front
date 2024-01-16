import "./index.css";
import React, {FC, useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {addAlpinistImage, changeAlpinistById, createAlpinist, getAlpinistById} from "../core/api/alpinist";
import {useNavigate, useParams} from "react-router-dom";

// import { useNavigate } from "react-router-dom";
// import { api } from "../api/config";
// import { changeExpeditionById } from "../core/api/expedition";
// import {
//     deleteAlpinistFromExpById,
//     deleteExpeditionById,
// } from "../core/api/alpinist";

export interface IAlpinistState {
    id: number;
    name: string;
    lifetime: string;
    country: string;
    // imageRef: string;
    // imageName: string;
    description: string;
    // Status: string;
}


export const AlpinistEditPage: FC = () => {
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [lifetime, setLifetime] = useState("")
    const [descr, setDescr] = useState("")
    const [image, setImage] = useState<File | null>(null);

    // const { alpinist, setAlpinist, requestHandler } = props;
    // const [yearError, setYearError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getAlpinistById(id).then((data) => {
                setName(data.alpinist?.name)
                setCountry(data.alpinist?.country)
                setDescr(data.alpinist?.description)
                setLifetime(data.alpinist?.lifetime)
            });
        }
    }, []);
    // const handleDeleteExpedition = () => {
    //     if (expedition?.id) {
    //         deleteExpeditionById(expedition.id).then(() => {
    //             navigate("/rip_front");
    //         });
    //     }
    // };
    //
    // const handleDeleteAlp = (id: number) => {
    //     deleteAlpinistFromExpById(id);
    //     requestHandler();
    // };

    const isValidForm = (): boolean => {
        let isValid = true;
        // if (!Number(expedition?.year) && expedition?.year !== "0") {
        //     setYearError(true);
        //     isValid = false;
        // }
        if (!name) {
            setNameError(true);
            isValid = false;
        }
        return isValid;
    };

    const handleEdit = async () => {
        if (isValidForm()) {
            if (id) {
                if (image) {
                    await addAlpinistImage(image, Number(id));
                }

                await changeAlpinistById({
                    id: Number(id),
                    name: name,
                    country: country,
                    description: descr,
                    lifetime: lifetime,
                })

                navigate(`/rip_front/alpinists/editable`);
            } else {
                const resp = await createAlpinist({
                    name: name,
                    country: country,
                    description: descr,
                    lifetime: lifetime,
                })

                if (image) {
                    console.log(image)
                    await addAlpinistImage(image, Number(resp.id));
                }

                navigate(`/rip_front/alpinists/editable`);

            }
        }
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameError(false);

        // const name = e.target.value;
        setName(e.target.value)
        // setExpedition({ ...expedition, name } as IExpeditionState);
    };

    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(e.target.value)
    };
    const handleChangeDescr = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescr(e.target.value)
    };
    const handleChangeLifetime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLifetime(e.target.value)
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file || null);
    };
    //
    // const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setYearError(false);
    //     const year = e.target.value;
    //     setExpedition({ ...expedition, year } as IExpeditionState);
    // };

    return (
        <Container className="exp_page">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text" defaultValue={name} style={{border: nameError ? "2px solid red" : ""}}
                                  onChange={handleChangeName}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Время жизни</Form.Label>
                    <Form.Control type="text" defaultValue={lifetime} onChange={handleChangeLifetime}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Страна</Form.Label>
                    <Form.Control type="text" defaultValue={country} onChange={handleChangeCountry}/>
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Изображение</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control as="textarea" rows={Math.max(10, descr?.split('\n').length)} defaultValue={descr}
                                  onChange={handleChangeDescr}/>
                </Form.Group>
            </Form>

            <Button variant="primary" onClick={() => {
                handleEdit();
            }}>
                Сохранить
            </Button>
        </Container>
    );
};
