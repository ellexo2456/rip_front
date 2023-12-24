import { FC, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import InputField from "./components/InputField/InputField";
import AlpinistCard from "./components/AlpinistCard/AlpinistCard";
import "./AlpinistsPage.css";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "../core/store";
import { selectApp, selectUser } from "../core/store/slices/selectors";
import { IAlpinist } from "../core/api/alpinist/typing";
import { saveSearchName } from "../core/store/slices/appSlice";
import { getAlpinists } from "../core/api/alpinist";

// import {deleteAlpinist} from "./modules/delete-alpinist.ts";

const AlpinistsPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [alpinists, setAlpinists] = useState<IAlpinist[]>([]);

  const dispatch = useDispatch();
  const { searchName } = useSelector(selectApp);
  const { isAuth } = useSelector(selectUser);

  const handleSearch = async () => {
    setLoading(true);
    const { alpinists } = await getAlpinists(searchName);
    setAlpinists(alpinists);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <Helmet>
        <style>
          {
            "body { font-family: 'Roboto Slab', serif; background-color: #D2DBDD; }"
          }
        </style>
      </Helmet>

      <div className={`my-container ${loading && "containerLoading"}`}>
        {loading && (
          <div className="loadingBg">
            <Spinner animation="border" />
          </div>
        )}

        <InputField
          value={searchName}
          setValue={(value) => dispatch(saveSearchName(value))}
          loading={loading}
          onSubmit={handleSearch}
        />

        {!alpinists.length && (
          <div>
            <h1>К сожалению, пока ничего не найдено :(</h1>
          </div>
        )}

        <Row xs={4} md={4} className="g-4">
          {alpinists.map((item, index) => (
            <Col key={index}>
              <AlpinistCard
                {...item}
                isAuth={isAuth}
                dispatch={dispatch}
                handler={handleSearch}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AlpinistsPage;
