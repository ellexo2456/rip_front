import "./index.css";
import React, { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { api } from "../../api/config";
import { IAlpinist } from "../../core/api/alpinist/typing";
import { changeExpeditionById } from "../../core/api/expedition";
import {
  deleteAlpinistFromExpById,
  deleteExpeditionById,
} from "../../core/api/alpinist";

interface IExpeditionState {
  year: string;
  id: number;
  name: string;
  status: string;
  createdAt: string;
  formedAt: string;
  closedAt: string;
  alpinists: IAlpinist[];
}

interface ExpPageForEditProps {
  expedition: IExpeditionState | undefined;
  setExpedition: (value: IExpeditionState | undefined) => void;
  requestHandler: () => void;
}

export const ExpPageForEdit: FC<ExpPageForEditProps> = (props) => {
  const { expedition, setExpedition, requestHandler } = props;
  const [yearError, setYearError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const navigate = useNavigate();

  const handleSubmitMission = () => {
    if (isValidForm() && !!expedition) {
      api
        .put(`/api/expedition/status/form/${expedition.id}`, {
          status: "сформировано",
        })
        .then((response) => {
          console.log(response);
          setExpedition(undefined);
          navigate("/rip_front");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDeleteExpedition = () => {
    if (expedition?.id) {
      deleteExpeditionById(expedition.id).then(() => {
        navigate("/rip_front");
      });
    }
  };

  const handleDeleteAlp = (id: number) => {
    deleteAlpinistFromExpById(id);
    requestHandler();
  };

  const isValidForm = (): boolean => {
    let isValid = true;
    if (!Number(expedition?.year) && expedition?.year !== "0") {
      setYearError(true);
      isValid = false;
    }
    if (!expedition?.name) {
      setNameError(true);
      isValid = false;
    }
    return isValid;
  };

  const handleChangeExpedition = () => {
    if (isValidForm()) {
      changeExpeditionById({
        name: expedition?.name || "",
        year: Number(expedition?.year || 0),
        id: expedition?.id || 0,
      });
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    const name = e.target.value;
    setExpedition({ ...expedition, name } as IExpeditionState);
  };

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearError(false);
    const year = e.target.value;
    setExpedition({ ...expedition, year } as IExpeditionState);
  };

  return (
    <Container className="exp_page">
      {expedition && expedition?.status && (
        <>
          <div
            key={expedition.id}
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              backgroundColor: "#D2DBDD",
              padding: "10px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <div className="input_element">
                <h3>Название:</h3>
                <input
                  style={{ border: nameError ? "2px solid red" : "" }}
                  type="text"
                  value={expedition.name}
                  onChange={handleChangeName}
                />
              </div>
              <div className="input_element">
                <p>Год:</p>
                <input
                  style={{ border: yearError ? "2px solid red" : "" }}
                  type="text"
                  value={expedition.year}
                  onChange={handleChangeYear}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Button
                variant="primary"
                onClick={() => {
                  handleChangeExpedition();
                }}
              >
                Сохранить
              </Button>
            </div>
          </div>
          {expedition.alpinists && expedition.alpinists.length &&
            expedition.alpinists.map((alp, index) => (
              <div className="alpenist_item" key={index}>
                <p>{alp.name}</p>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteAlp(alp.id)}
                >
                  Удалить
                </Button>
              </div>
            ))}
        </>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        <Button onClick={handleSubmitMission}>Сформировать экспедицию</Button>
        <Button variant="danger" onClick={handleDeleteExpedition}>
          Удалить экспедицию
        </Button>
      </div>
    </Container>
  );
};
