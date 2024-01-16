import "./index.css";
import React, {useEffect, useState} from "react";
import {Button, Form, Table} from "react-bootstrap";
import {getExpeditions} from "../core/api/expedition";
import {IExpedition} from "../core/api/expedition/typing";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../core/store";

const emptyDate: string = "0001-01-01T02:30:17+02:30"

export const HistoryPage = () => {
    const dispatch = useDispatch();
    const startDate = useSelector((state: RootState) => state.requestFilters.startDate);
    const endDate = useSelector((state: RootState) => state.requestFilters.endDate);
    const status = useSelector((state: RootState) => state.requestFilters.status);
    const user = useSelector((state: RootState) => state.requestFilters.user);
    const [localUser, setLocalUser] = useState(user);

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setStartDateFilter(e.target.value));
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEndDateFilter(e.target.value));
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setStatusFilter(e.target.value));
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalUser(e.target.value)
        dispatch(setUserFilter(e.target.value));
    };

    const [expeditions, setExpeditions] = useState<IExpedition[] | undefined>(
        undefined
    );

    const navigate = useNavigate();

    useEffect(() => {
        getExpeditions().then((data) => setExpeditions(data.expedition.filter((exp) => exp.status !== "черновик")));
    }, []);

    const formatDateTime = (dateTimeString: string) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        } as const;
        return new Date(dateTimeString).toLocaleDateString("ru-US", options);
    };

    return (
        <div className="history_page">
            <h1>История Экспедиций</h1>
            <div style={{ margin: '3% 10% 0 10%' }}>
                <div style={{ display: 'flex', marginBottom: '1%' }}>
                    <div className='filter'>
                        <label>Дата начала:</label>
                        <input type="date" value={startDate} onChange={handleStartDateChange} />
                    </div>
                    <div className='filter'style={{ marginLeft: '1%'}}>
                        <label>Дата конца:</label>
                        <input type="date" value={endDate} onChange={handleEndDateChange} />
                    </div>
                    <div className='filter' style={{ marginLeft: '1%', marginRight: '1%' }}>
                        <select value={status} onChange={handleStatusChange}>
                            <option value="">Статус (все)</option>
                            <option key={"formed"} value={"formed"}>
                                Сформирована
                            </option>
                            <option key={"rejected"} value={"rejected"}>
                                Отклонена
                            </option>
                            <option key={"completed"} value={"completed"}>
                                Одобрена
                            </option>
                        </select>
                    </div>
                    <div className='filter'>
                        <Form
                            className="d-flex"
                            id="search"
                            style={{ width: "20%", minWidth: "250px" }}
                        >
                            <Form.Control
                                type="search"
                                placeholder="Поиск по имени клиента"
                                className="me-2"
                                aria-label="Search"
                                value={user}
                                onChange={handleUserChange}
                            />
                        </Form>
                    </div>
                    <Button className='filter-button' variant="primary" onClick={() => { handleResetFilter() }}>
                        Сбросить фильтры
                    </Button>
                </div>
            </div>

            <Table striped bordered hover size="sm" className="history_table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Год</th>
                    <th>Статус</th>
                    <th>Создание</th>
                    <th>Формирование</th>
                    <th>Завершение</th>
                    <th>Польователь</th>
                    <th>Модератор</th>
                </tr>
                </thead>
                <tbody>
                {expeditions &&
                    expeditions.length &&
                    expeditions.map((exp, index) => {
                        return (
                            <tr
                                key={index}
                                onClick={() => navigate(`/rip_front/missions/${exp.id}`)}
                                style={{cursor: "pointer"}}
                            >
                                <td>{index + 1}</td>
                                <td>{exp.name}</td>
                                <td>{exp.year}</td>
                                <td>{exp.status}</td>
                                <td>{formatDateTime(exp.createdAt)}</td>
                                <td>{exp.formedAt !== emptyDate ? formatDateTime(exp.formedAt) : "-"}</td>
                                <td>{exp.closedAt !== emptyDate ? formatDateTime(exp.closedAt) : "-"}</td>
                                <td>{exp.user?.Email ? exp.user.Email : "-"}</td>
                                <td>{exp.moderator?.Email ? exp.moderator.Email : "-" }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};
