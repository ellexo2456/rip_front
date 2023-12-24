import {FC} from 'react'
import './AlpinistCard.css'
// import DeleteButton from "../DeleteButton/DeleteButton.tsx";
import {Link} from "react-router-dom";
// @ts-ignore
import kukuczka from  "../../../models/mock/kukuczka.png"

interface Props {
    id: number
    country: string
    lifetime: string
    imageRef: string
    name: string
    // deleteHandler: (id: string) => () => Promise<void>
}

const AlpinistCard: FC<Props> = ({id, country, lifetime, imageRef, name}) => (
    <div className="my-card-wrapper">
        <article className="my-card">
            <div className="my-card__img" style={{backgroundImage: `url(${imageRef})`}}></div>
            <Link to={"/rip_front/alpinist/" + id} className="my-card_link">
                <div className="my-card__img--hover" style={{backgroundImage: `url(${imageRef})`}}></div>
            </Link>
            <div className="my-card__info">
                <span className="my-card__category">{country}</span>
                <h3 className="my-card__title">{name}</h3>
                <span className="my-card__by"><a href="#" className="my-card__author"
                                                 title="author">{lifetime}</a></span>
            </div>
            {/*<DeleteButton onSubmit={deleteHandler(String(id))} ></DeleteButton>*/}

        </article>

        {/* <form action="/service/delete" method="POST">
            <button name="id" value="{{.ID}}"></button>
        </form> */}
    </div>
)

export default AlpinistCard;
