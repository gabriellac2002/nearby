import { Alert, SafeAreaView, Text, View } from "react-native";
import { api } from "./services/api";
import { useEffect, useState } from "react";
import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Loading } from "@/components/loading";

type Places = PlaceProps & {};

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");

  const [places, setPlaces] = useState<Places[]>([]);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  async function getCurrentLocation() {
    try {
      let { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        Alert.alert("Localização", "É necessário permitir a localização");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      console.log("data", data);
      setCategories(data);
      setCategory(data[0].id);
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
    getCurrentLocation();
  }, [location]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [category]);

  if (!location) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <MapView
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        initialRegion={{
          latitude: location?.coords.latitude || -23.55052,
          longitude: location?.coords.longitude || -46.633308,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          image={require("@/assets/location.png")}
        />
      </MapView>
      <Categories
        data={categories}
        onSelected={setCategory}
        selected={category}
      />
      <Places data={places} />
    </View>
  );
}
