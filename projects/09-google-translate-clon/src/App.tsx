import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from "./consts";
import { ArrowsIcon, ClipboardIcon, SpeakIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import { Stack } from "react-bootstrap";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

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

  // This is the hook that we are going to use to debounce the original text
  const debounceFromOriginalText = useDebounce(originalText.trim(), 500);

  useEffect(() => {
    if (debounceFromOriginalText === "") return;

    translate(debounceFromOriginalText, fromLang, toLang)
      .then((result) => {
        if (result == null) return;
        setTranslatedText(result);
      })
      .catch((err) => console.error(err));
  }, [debounceFromOriginalText, fromLang, toLang]);

  const handleClipboardClick = () => {
    navigator.clipboard.writeText(translatedText).catch(() => {});
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = VOICE_FOR_LANGUAGE[toLang];
    speechSynthesis.speak(utterance);
  };

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
            <div style={{ position: "relative" }}>
              <TextArea
                tipo={SectionType.To}
                valueText={translatedText}
                onChangeText={setTranslatedText}
                isLoading={isLoading}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  display: "flex",
                }}
              >
                <Button variant="link" onClick={handleClipboardClick}>
                  <ClipboardIcon />
                </Button>
                <Button variant="link" onClick={handleSpeak}>
                  <SpeakIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
