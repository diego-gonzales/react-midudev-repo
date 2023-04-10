import { Form } from "react-bootstrap";
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../consts";
import { FromLanguage, Language, SectionType } from "../types.d";

// interface LanguageSelectorProps {
//   onChangeLanguage: (lang: Language) => void;
// }

/* Creamos este type para que el componente LanguageSelector pueda recibir dos tipos de props diferentes,
 dependiendo del tipo de sección que sea (From o To) */
type LanguageSelectorProps =
  | {
      tipo: SectionType.From;
      value: FromLanguage;
      onChangeLanguage: (lang: FromLanguage) => void;
    }
  | {
      tipo: SectionType.To;
      value: Language;
      onChangeLanguage: (lang: Language) => void;
    };

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
      {tipo === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detect language</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([clave, valor]) => (
        <option key={clave} value={clave}>
          {valor}
        </option>
      ))}
    </Form.Select>
  );
};
