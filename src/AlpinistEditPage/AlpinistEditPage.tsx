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
    const [birthDate, setBirthDate] = useState("")
    const [deathDate, setDeathDate] = useState("")
    const [descr, setDescr] = useState("")
    const [image, setImage] = useState<File | null>(null);

    // const { alpinist, setAlpinist, requestHandler } = props;
    // const [yearError, setYearError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [deathDateError, setDeathDateError] = useState(false);
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

        if (!birthDate && deathDate) {
            setBirthDateError(true);
            isValid = false;
        }

        const bd = new Date(birthDate)
        const dd = new Date(deathDate)
        if (bd >= dd) {
            setBirthDateError(true);
            isValid = false;
        }
        const td = new Date();
        const ld = new Date("1200-01-01");

        if (bd) {
            if (bd <= ld || bd >= td) {
                setBirthDateError(true);
                isValid = false;
            }
        }
        if (dd) {
            if ((dd <= ld || dd >= td) && dd) {
                setDeathDateError(true);
                isValid = false;
            }
        }
        return isValid;
    };

    const handleEdit = async () => {
        if (isValidForm()) {
            if (id) {
                if (image) {
                    await addAlpinistImage(image, Number(id));
                }

                let bd = "";
                let dd = "";
                if (birthDate) {
                    bd = birthDate.replace(/-/g, ".")
                }
                if (deathDate) {
                    dd = deathDate.replace(/-/g, ".")
                }

                await changeAlpinistById({
                    id: Number(id),
                    name: name,
                    country: country,
                    description: descr,
                    lifetime: bd + " - " + dd,
                })

                navigate(`/rip_front/alpinists/editable`);
            } else {
                let bd = "";
                let dd = "";
                if (birthDate) {
                    bd = birthDate.replace(/-/g, ".")
                }
                if (deathDate) {
                    dd = deathDate.replace(/-/g, ".")
                }
                const resp = await createAlpinist({
                    name: name,
                    country: country,
                    description: descr,
                    lifetime: bd + " - " + dd,
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
    const handleChangeBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDateError(false);
        setBirthDate(e.target.value);
    };
    const handleChangeDeathDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDateError(false);
        setDeathDateError(false);
        setDeathDate(e.target.value);
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
                    <Form.Label>Дата рождения</Form.Label>
                    <Form.Control type="date" style={{border: birthDateError ? "2px solid red" : ""}}
                                  defaultValue={(lifetime.split("-"))[0]?.replace(/\./g, "-").trim()}
                                  onChange={handleChangeBirthDate}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Дата смерти</Form.Label>
                    <Form.Control type="date" style={{border: deathDateError ? "2px solid red" : ""}}
                                  defaultValue={(lifetime.split("-"))[1]?.replace(/\./g, "-").trim()}
                                  onChange={handleChangeDeathDate}/>
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
