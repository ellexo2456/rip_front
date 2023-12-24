import React, { useEffect, useState } from "react";
import { api } from "../api/config";
import { Container } from "react-bootstrap";

interface User {
    id: number,
    Email: string,
}

interface Expedition {
    id: number,
    name: string,
    status: string,
    user: User,
    year: number,
}

export const HistoryPage = () => {
    const [expeditions, setExpeditions] = useState<Expedition[] | undefined>(undefined);

    useEffect(() => {
        api.get(`/api/expedition/filter`)
            .then(response => {
                if (response.status === 200) {
                    setExpeditions(response.data.expedition);
                }
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    return (
        <Container>
            {expeditions !== undefined && expeditions.map(expedition => (
                <div key={expedition.id} style={{ display: "flex", flexDirection: "row", width: "100%", "justifyContent": "space-between", backgroundColor: "#D2DBDD", padding: "10px", borderRadius: "10px", marginTop: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <h3>Название: {expedition.name}</h3>
                        <p>Год: {expedition.year}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                        <p>Почта: {expedition.user.Email}</p>
                        <p>Статус: {expedition.status}</p>
                        {/* <Button
                            variant='danger'
                            onClick={() => {handleDeleteMission(expedition.id)}}
                        >
                            Удалить
                        </Button> */}
                    </div>
                </div>
            ))}
            {/* <Button style={{ marginTop: "10px" }} onClick={handleSubmitMissions}>Оформить миссии</Button> */}
        </Container>
    )
}