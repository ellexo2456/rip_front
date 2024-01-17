import {Dispatch, FC} from "react";
import "./AlpinistCard.css";
// import DeleteButton from "../DeleteButton/DeleteButton.tsx";
import {Link} from "react-router-dom";
// @ts-ignore
import kukuczka from "/public/kukuczka.png"
// @ts-ignore
import messner from "/public/messner.png"
// @ts-ignore
import erhard from "/public/erhard.jpeg"
import {Button} from "react-bootstrap";
import {api} from "../../../api/config";
import {IAppData, addNotification} from "../../../core/store/slices/appSlice";
import {ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import {IUser} from "../../../core/store/slices/userSlice";

interface Props {
    id: number;
    country: string;
    lifetime: string;
    imageRef: string;
    name: string;
    isAuth: boolean;
    handler: () => void;
    dispatch: ThunkDispatch<
        {
            user: IUser;
            app: IAppData;
        },
        undefined,
        UnknownAction
    > &
        Dispatch<UnknownAction>;
    // deleteHandler: (id: string) => () => Promise<void>
}

const AlpinistCard: FC<Props> = ({
                                     id,
                                     country,
                                     lifetime,
                                     imageRef,
                                     name,
                                     isAuth,
                                     handler,
                                     dispatch,
                                 }) => {
    const handleAddToExpidition = () => {
        api
            .post(`/api/alpinist/expedition/${Number(id)}`)
            .then((response) => {
                console.log(response);
                handler();
                dispatch(
                    addNotification({
                        message: "Альпинист добавлен",
                    })
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="my-card-wrapper">
            <article className="my-card">
                <div
                    className="my-card__img"
                    style={{backgroundImage: `url(${imageRef})`}}
                ></div>
                <Link to={"/rip_front/alpinist/" + id} className="my-card_link">
                    <div
                        className="my-card__img--hover"
                        style={{backgroundImage: `url(${imageRef})`}}
                    ></div>
                </Link>
                <div className="my-card__info">
                    <span className="my-card__category">{country}</span>
                    <h3 className="my-card__title">{name}</h3>
                    <span className="my-card__by">
                        <a href="#" className="my-card__author" title="author">
                          {!((lifetime.split("-"))[1].trim()) && ((lifetime.split("-"))[0].trim()) ? (lifetime.split("-"))[0] + " - нн" : lifetime}
                        </a>
                    </span>
                </div>
            </article>
            {isAuth && (
                <Button className="primary my-card__add-button" onClick={handleAddToExpidition}>
                    Добавить в экспедицию
                </Button>
            )}
        </div>
    );
};

export default AlpinistCard;
