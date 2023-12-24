import "./index.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../core/store/slices/selectors";
import { getExpeditionById } from "../core/api/expedition";
import { IAlpinist } from "../core/api/alpinist/typing";
import { useParams } from "react-router-dom";
import { ExpPageForEdit } from "../components/ExpPageForEdit/ExpPageForEdit";
import { ExpPage } from "../components/ExpPage/ExpPage";

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

export const ExpeditionPage = () => {
  const [expedition, setExpedition] = useState<IExpeditionState | undefined>(
    undefined
  );
  const { id } = useParams();
  const { expeditionId } = useSelector(selectUser);

  console.log(id, expeditionId);

  const getExpedition = () => {
    if (id) {
      getExpeditionById(id).then((data) =>
        setExpedition({
          ...data.expedition,
          year: String(data.expedition.year),
        })
      );
    }
  };

  useEffect(() => {
    getExpedition();
  }, [id]);

  if (!expedition) return <h1>Загрузка</h1>;

  return id === expeditionId ? (
    <ExpPageForEdit
      expedition={expedition}
      setExpedition={setExpedition}
      requestHandler={getExpedition}
    />
  ) : (
    <ExpPage expedition={expedition} />
  );
};
