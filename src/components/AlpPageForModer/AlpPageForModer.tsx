import "./index.css";
import {useEffect, useState} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
// import { getExpeditions } from "../core/api/expedition";
import {IAlpinist} from "../../core/api/alpinist/typing";
import {useDispatch, useSelector} from "../../core/store";
import {selectApp} from "../../core/store/slices/selectors";

import {useNavigate} from "react-router-dom";
import {getAlpinists} from "../../core/api/alpinist";
import {api} from "../../api/config.ts";
import InputField from "../../AlpinistsPage/components/InputField/InputField.tsx";
import {saveSearchName} from "../../core/store/slices/appSlice.ts";

export const AlpPageForModer = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {searchName} = useSelector(selectApp);
    const [alpinists, setAlpinists] = useState<IAlpinist[] | undefined>(
        undefined
    );

    const handleSearch = async () => {
        setLoading(true);
        const {alpinists} = await getAlpinists(searchName);
        setAlpinists(alpinists);
        setLoading(false);

        // getAlpinists().then((data) => setAlpinists(data.alpinists));
        // setAlpinists(alpinists);
    };

    const navigate = useNavigate();

    useEffect(() => {
        getAlpinists().then((data) => setAlpinists(data.alpinists));
    }, []);

    // const formatDateTime = (dateTimeString: string) => {
    //   const options = {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //     hour: "numeric",
    //     minute: "numeric",
    //     second: "numeric",
    //   } as const;
    //   return new Date(dateTimeString).toLocaleDateString("ru-US", options);
    // };

    // const handleDelete = () => {
    //     api
    //         .delete(`/api/alpinist/${Number(id)}`)
    //         .then((response) => {
    //             console.log(response);
    //             handler();
    //             dispatch(
    //                 addNotification({
    //                     message: "Альпинист добавлен",
    //                 })
    //             );
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    return (
        <div className="history_page">
            <div className={`${loading && "containerLoading"}"`}>
                {loading && (
                    <div className="loadingBg">
                        <Spinner animation="border"/>
                    </div>
                )}

                <InputField
                    value={searchName}
                    setValue={(value) => dispatch(saveSearchName(value))}
                    loading={loading}
                    onSubmit={handleSearch}
                />

                {/*{!alpinists.length && (*/}
                {/*    <div>*/}
                {/*        <h1>К сожалению, пока ничего не найдено :(</h1>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>

            <h1>Альпинисты</h1>
            <Table striped bordered hover size="sm" className="history_table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>Время жизни</th>
                    <th>Страна</th>
                    <th>Изображение</th>
                    <th>Описание</th>
                    <th>Статус</th>
                    <th>Удаление</th>
                </tr>
                </thead>
                <tbody>
                {alpinists &&
                    alpinists.length &&
                    alpinists.map((alp, index) => {
                        return (
                            <tr
                                key={index}
                                onClick={() => navigate(`/rip_front/alpinist/${alp.id}`)}
                                style={{cursor: "pointer"}}
                            >
                                <td>{index + 1}</td>
                                <td>{alp.name}</td>
                                <td>{alp.lifetime}</td>
                                <td>{alp.country}</td>
                                <td>{alp.imageRef}</td>
                                <td>{alp.description}</td>
                                <td>{alp.Status}</td>
                                <td>
                                    <Button variant="danger" style={{width: "min-content"}} onClick={(e) => {
                                        e.stopPropagation();
                                        api
                                            .delete(`/api/alpinist/${Number(alp.id)}`)
                                            .then((response) => {
                                                console.log(response);
                                                getAlpinists().then((data) => setAlpinists(data.alpinists));

                                                // handleSearch();
                                                // dispatch(
                                                //     addNotification({
                                                //         message: "Альпинист добавлен",
                                                //     })
                                                // );
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                    }}>
                                        Удалить
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};
