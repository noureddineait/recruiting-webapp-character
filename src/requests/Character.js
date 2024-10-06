import { requestAPI } from "./RequestAPI";

export const FetchCharacters = async () => {
	const characters = await requestAPI(
		"https://recruiting.verylongdomaintotestwith.ca/api/{noureddineait}/character"
	);
	return characters;
};

export const PushCharacters = async (characters) => {
	const response = await requestAPI(
		"https://recruiting.verylongdomaintotestwith.ca/api/{noureddineait}/character",
		"POST",
		characters
	);
	return response;
};
