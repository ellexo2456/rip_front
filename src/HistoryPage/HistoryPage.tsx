import "./index.css";
import React, {useEffect, useState} from "react";
import {Button, Form, Table} from "react-bootstrap";
import {changeExpModerStatus, getExpeditions, getExpeditionsWithFilters} from "../core/api/expedition";
import {IExpedition} from "../core/api/expedition/typing";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../core/store";
import {
    setEndDateFilter,
    setStartDateFilter,
    setStatusFilter,
    setUserFilter
} from "../core/store/requestFilters/actions.tsx";
import {selectUser} from "../core/store/slices/selectors.ts";
import {Role} from "../core/store/slices/userSlice.ts";
import {getRole} from "../core/api/auth";

const emptyDate: string = "0001-01-01T02:30:17+02:30"

export const HistoryPage = () => {
    const [expeditions, setExpeditions] = useState<IExpedition[] | undefined>(
        undefined
    );
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const startDate = useSelector((state: RootState) => state.requestFilters.startDate);
    const endDate = useSelector((state: RootState) => state.requestFilters.endDate);
    const status = useSelector((state: RootState) => state.requestFilters.status);
    const user = useSelector((state: RootState) => state.requestFilters.user);
    const [localUser, setLocalUser] = useState(user);
    const {role} = useSelector(selectUser);


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

    const handleResetFilter = () => {
        dispatch(setStartDateFilter(''));
        dispatch(setEndDateFilter(''));
        dispatch(setStatusFilter(''));
        dispatch(setUserFilter(''));
        setLocalUser('')
        fetchData(startDate, endDate, status)
    }

    const handleChangeStatus = async (id: number, newStatus: string) => {
        await changeExpModerStatus(id, newStatus)
        fetchData(startDate, endDate, status)
    }

    const fetchData = (startDate: string, endDate: string, status: string) => {
        getExpeditionsWithFilters(startDate, endDate, status).then((data) => {
            let filteredResult = data.expedition
            filteredResult = data.expedition.filter((exp) => exp.status !== "черновик")

            if (localUser != '') {
                filteredResult = data.expedition.filter((exp) => exp.user?.Email.includes(localUser)) || data.expedition
            }

            setExpeditions(filteredResult);
        })
    };


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

    useEffect(() => {
        getExpeditions().then((data) => setExpeditions(data.expedition.filter((exp) => exp.status !== "черновик")));
    }, []);

    const fetchDataWithPolling = async () => {
        try {
            fetchData(startDate, endDate, status);
        } catch (error) {
            console.error('Error fetching data with polling:', error);
        }
    };

    useEffect(() => {
        (async () => {
            await getRole();
        })()

        fetchData(startDate, endDate, status);
    }, [startDate, endDate, status])

    useEffect(() => {
        if (localUser != "") {
            const previos = expeditions
            setExpeditions(expeditions?.filter((exp) => exp.user?.Email.includes(localUser)) || previos);
        }
    }, [localUser])

    useEffect(() => {
        const pollingInterval = setInterval(() => {
            fetchDataWithPolling();
        }, 2000);
        console.log('get data')
        return () => clearInterval(pollingInterval);

    }, [startDate, endDate, status, localUser]);


    return (
        <div className="history_page">
            <h1>История Экспедиций</h1>
            {role == Role.ADMIN && <div style={{margin: '3% 10% 0 7%', display: "flex"}}>
                <div style={{display: 'flex', marginBottom: '1%'}}>
                    <div className='filter'>
                        <label className={"me-1 label"}>Дата начала:</label>
                        <input className={"ps-2"} type="date" value={startDate} onChange={handleStartDateChange}/>
                    </div>
                    <div className='filter' style={{marginLeft: '1%'}}>
                        <label className={"me-1 label"}>Дата конца:</label>
                        <input className={"ps-2"} type="date" value={endDate} onChange={handleEndDateChange}/>
                    </div>
                    <div className={'filter'}  style={{marginLeft: '2%', marginRight: '2%'}}>
                        <select className={"p-1"} value={status} onChange={handleStatusChange}>
                            <option  value="">Статус (все)</option>
                            <option key={"formed"} value={"сформировано"}>
                                Сформировано
                            </option>
                            <option key={"rejected"} value={"отклонено"}>
                                Отклонено
                            </option>
                            <option key={"completed"} value={"завершено"}>
                                Завершено
                            </option>
                        </select>
                    </div>
                    <div className='filter'>
                        <Form
                            className="d-flex"
                            id="search"
                            style={{width: "20%", minWidth: "250px"}}
                        >
                            <Form.Control
                                type="search"
                                placeholder="Поиск по имени пользователя"
                                className="me-2"
                                style={{minWidth: "270px"}}
                                aria-label="Search"
                                value={user}
                                onChange={handleUserChange}
                            />
                        </Form>
                    </div>
                    <Button
                        className='filter-button'
                        variant="custom"
                        onClick={() => {
                            handleResetFilter()
                        }}>
                        Сбросить фильтры
                    </Button>
                </div>
            </div>}

            <Table striped bordered hover size="sm" className="history_table">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Год</th>
                    <th>Статус</th>
                    <th>Создание</th>
                    <th>Формирование</th>
                    <th>Завершение</th>
                    {role == Role.ADMIN && <>
                        <th>Польователь</th>
                        <th>Модератор</th>
                    </>}
                    <th>Архив</th>
                    {role == Role.ADMIN && <>
                        <th>Завершить</th>
                        <th>Отклонить</th>
                    </>}
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
                                <td>{exp.name}</td>
                                <td>{exp.year}</td>
                                <td>{exp.status}</td>
                                <td>{formatDateTime(exp.createdAt)}</td>
                                <td>{exp.formedAt !== emptyDate ? formatDateTime(exp.formedAt) : "-"}</td>
                                <td>{exp.closedAt !== emptyDate ? formatDateTime(exp.closedAt) : "-"}</td>
                                {role == Role.ADMIN &&
                                    <>
                                        <td>{exp.user?.Email ? exp.user.Email : "-"}</td>
                                        <td>{exp.moderator?.Email ? exp.moderator.Email : "-"}</td>
                                    </>
                                }
                                <td>{exp.archived ? "да" : (exp.archived === null ? "-" : "нет")}</td>
                                {role == Role.ADMIN && <td>
                                    {exp.status == 'завершено' ? "завершено" :
                                        (exp.status == 'отклонено' ? "отклонено" :
                                                <Button
                                                    variant="custom3"
                                                    onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleChangeStatus(exp.id, 'завершено')
                                                }}>
                                                    Завершить
                                                </Button>
                                        )}
                                </td>
                                }
                                {role == Role.ADMIN && <td>
                                    {exp.status == 'завершено' ? "завершено" :
                                        (exp.status == 'отклонено' ? "отклонено" :
                                                <Button
                                                    variant="danger"
                                                    onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleChangeStatus(exp.id, 'отклонено')
                                                }}>
                                                    Отклонить
                                                </Button>
                                        )}
                                </td>
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};
