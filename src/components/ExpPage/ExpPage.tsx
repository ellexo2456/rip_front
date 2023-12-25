import "./index.css";
import { Container } from "react-bootstrap";
import { IAlpinist } from "../../core/api/alpinist/typing";
import { FC } from "react";

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

interface ExpPageProps {
  expedition: IExpeditionState | undefined;
}

export const ExpPage: FC<ExpPageProps> = (props) => {
  const { expedition } = props;
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
                <div style={{
                    display: "flex",
                    alignItems: "center",
                }}>{expedition.name}</div>
              </div>
              <div className="input_element">
                <p>Год:</p>
                <p>{expedition.year}</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            ></div>
          </div>
          {expedition.alpinists && expedition.alpinists.length &&
            expedition.alpinists.map((alp, index) => (
              <div className="alpenist_item" key={index}>
                <p>{alp.name}</p>
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
      ></div>
    </Container>
  );
};
