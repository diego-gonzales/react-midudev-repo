import { Form } from "react-bootstrap";
import { SUPPORTED_LANGUAGES } from "../consts";
import { FromLanguage, Language } from "../types";

// interface LanguageSelectorProps {
//   onChangeLanguage: (lang: Language) => void;
// }

type LanguageSelectorProps =
  | {
      tipo: "from";
      value: FromLanguage;
      onChangeLanguage: (lang: FromLanguage) => void;
    }
  | { tipo: "to"; value: Language; onChangeLanguage: (lang: Language) => void };

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  tipo,
  value,
  onChangeLanguage,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeLanguage(e.target.value as Language);
  };

  return (
    <Form.Select
      aria-label="Select a language"
      onChange={handleChange}
      value={value}
    >
      {tipo === "from" && <option value="auto">Detect language</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([clave, valor]) => (
        <option key={clave} value={clave}>
          {valor}
        </option>
      ))}
    </Form.Select>
  );
};
