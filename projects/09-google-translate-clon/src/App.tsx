import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE } from "./consts";
import { ArrowsIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import { Stack } from "react-bootstrap";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";

function App() {
  const {
    fromLang,
    toLang,
    setFromLang,
    setToLang,
    interchangeLanguages,
    originalText,
    translatedText,
    setOriginalText,
    setTranslatedText,
    isLoading,
  } = useStore();

  useEffect(() => {
    if (originalText.trim() === "") return;

    translate(originalText, fromLang, toLang)
      .then((result) => {
        if (result == null) return;
        setTranslatedText(result);
      })
      .catch((err) => console.error(err));
  }, [originalText, fromLang, toLang]);

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <h2>From</h2>
          <Stack gap={2}>
            <LanguageSelector
              tipo={SectionType.From}
              value={fromLang}
              onChangeLanguage={setFromLang}
            />
            <TextArea
              tipo={SectionType.From}
              valueText={originalText}
              onChangeText={setOriginalText}
            />
          </Stack>
        </Col>
        <Col xs="auto">
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
          <Stack gap={2}>
            <LanguageSelector
              tipo={SectionType.To}
              value={toLang}
              onChangeLanguage={setToLang}
            />
            <TextArea
              tipo={SectionType.To}
              valueText={translatedText}
              onChangeText={setTranslatedText}
              isLoading={isLoading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
