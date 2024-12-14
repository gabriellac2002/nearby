import { Text, useWindowDimensions, View } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Place, PlaceProps } from "../place";
import { s } from "./styles";

type Props = {
  data: PlaceProps[];
};

export function Places({ data }: Props) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = [278, dimensions.height - 128];
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place data={item} />}
        contentContainerStyle={s.content}
        ListHeaderComponent={() => (
          <Text style={s.title}>Explore locais perto de você</Text>
        )}
      />
    </BottomSheet>
  );
}
