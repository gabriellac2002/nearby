import { Alert, Text, View } from "react-native";
import { api } from "./services/api";
import { useEffect, useState } from "react";
import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";

type Places = PlaceProps & {};
export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");

  const [places, setPlaces] = useState<Places[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      console.log("data", data);
      setCategories(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Erro ao buscar categorias");
    }
  }

  async function fetchPlaces() {
    try {
      if (!category) return;

      const { data } = await api.get("/markets/category/" + category);
      setPlaces(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Locais", "Erro ao buscar locais");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [category]);

  console.log(categories);

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        onSelected={setCategory}
        selected={category}
      />
    </View>
  );
}
