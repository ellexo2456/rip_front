import "./index.css";
import  { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getExpeditions } from "../core/api/expedition";
import { IExpedition } from "../core/api/expedition/typing";
import { useNavigate } from "react-router-dom";

export const HistoryPage = () => {
  const [expeditions, setExpeditions] = useState<IExpedition[] | undefined>(
    undefined
  );

  const navigate = useNavigate();

  useEffect(() => {
    getExpeditions().then((data) => setExpeditions(data.expedition.filter((exp ) => exp.status !== "черновик")));
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
                  <td>{formatDateTime(exp.formedAt)}</td>
                  <td>{formatDateTime(exp.closedAt)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
