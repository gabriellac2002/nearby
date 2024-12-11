import { Text, View } from "react-native";
import { colors } from "@/styles/theme";
import { s } from "./styles";

type StepProps = {
  title: string;
  description: string;
};

export function Step({ title, description }: StepProps) {
  return (
    <View style={s.container}>
      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  );
}
