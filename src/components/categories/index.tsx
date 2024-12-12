import { FlatList } from "react-native";
import { Category } from "../category";
import { s } from "./styles";

export type CategoriesProps = {
  id: string;
  name: string;
}[];

type Props = {
  data: CategoriesProps;
  selected: string;
  onSelected: React.Dispatch<React.SetStateAction<string>>;
};

export function Categories({ data, selected, onSelected }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelected(item.id)}
          isSelected={selected === item.id}
        />
      )}
      horizontal
      contentContainerStyle={s.content}
      showsHorizontalScrollIndicator={false}
    />
  );
}
