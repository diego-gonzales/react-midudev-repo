import { SectionType } from "../types.d";
import { Form } from "react-bootstrap";

interface TextAreaProps {
  tipo: SectionType;
  valueText: string;
  onChangeText: (value: string) => void;
  isLoading?: boolean;
}

const commonStyles = { border: 0, height: "200px", resize: "none" };

const getPleaceholder = (tipo: SectionType, isLoading?: boolean) => {
  if (tipo === SectionType.From) return "Ingresar texto";
  if (isLoading) return "Traduciendo...";
  return "Traducción";
};

export const TextArea: React.FC<TextAreaProps> = ({
  tipo,
  valueText,
  onChangeText,
  isLoading,
}) => {
  const styles =
    tipo === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#eee" };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeText(e.target.value);
  };

  return (
    <Form.Control
      as="textarea"
      placeholder={getPleaceholder(tipo, isLoading)}
      style={styles}
      disabled={tipo === SectionType.To}
      autoFocus={tipo === SectionType.From}
      value={valueText}
      onChange={handleChange}
    />
  );
};
