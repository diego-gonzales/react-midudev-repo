import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE } from "./consts";
import { ArrowsIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { FromLanguage } from "./types";

function App() {
  const { fromLang, toLang, setFromLang, setToLang, interchangeLanguages } =
    useStore();

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <h2>From</h2>
          <LanguageSelector
            tipo="from"
            value={fromLang}
            onChangeLanguage={setFromLang}
          />
          {fromLang}
        </Col>
        <Col>
          <Button
            variant="link"
            disabled={fromLang === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <h2>To</h2>
          <LanguageSelector
            tipo="to"
            value={toLang}
            onChangeLanguage={setToLang}
          />
          {toLang}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
