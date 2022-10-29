import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlices";
import NavFavorites from "../components/NavFavorites";

const HomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image
					source={{
						uri: "https://links.papareact.com/gzs",
					}}
					style={{
						width: 100,
						height: 100,
						resizeMode: "contain",
					}}
				/>
				<GooglePlacesAutocomplete
					placeholder="Where from?"
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
					minLength={2}
					fetchDetails={true}
					returnKeyType="search"
					enablePoweredByContainer={false}
					styles={{
						container: {
							flex: 0,
						},
						text: {
							fontSize: 18,
						},
					}}
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: "en",
					}}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);

						dispatch(setDestination(null));
					}}
				/>

				<NavOptions />
				<NavFavorites />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
