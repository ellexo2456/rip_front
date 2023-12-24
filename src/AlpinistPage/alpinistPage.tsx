import { FC, useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

// import InputField from './components/InputField/InputField'
// import DeleteButton from './components/DeleteButton/DeleteButton'
import "./alpinistPage.css";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getAlpinistById } from "../core/api/alpinist";
import { IAlpinist } from "../core/api/alpinist/typing";

const IAlpinistPage: FC = () => {
  const { id } = useParams();
  const [alpinist, setAlpinist] = useState<IAlpinist | null>(null);

  useEffect(() => {
    if (id) {
      getAlpinistById(id).then((data) => setAlpinist(data.alpinist));
    }
  }, [id]);

  if (!alpinist) {
    return <div>No data available.</div>;
  }

  return (
    <div className={"alpinist-page"}>
      <Helmet>
        <style>{"body { background-color: #868686; }"}</style>
      </Helmet>

      <div className={"content__wrapper"}>
        <Row className={"content__box"}>
          <Col></Col>
          <Col xs={4} className={"content__column"}>
            <a href="#">
              <img
                src={alpinist.imageRef}
                alt="Img"
                className={"content__image"}
              />
            </a>
          </Col>
          <Col xs={5} className={"me-5 content__column"}>
            <div className={"content__header"}>{alpinist.name}</div>
            <div className={"content"}>{alpinist.description}</div>
          </Col>
        </Row>

        <div className="content__attribution">{alpinist.country}</div>
      </div>
    </div>
  );
};

export default IAlpinistPage;
