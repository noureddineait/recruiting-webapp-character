import { useEffect, useState } from "react";
import "./App.css";
import Character from "./components/Character.jsx";
import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts.js";
import { ModifierCalculator } from "./utils/ModifierCalculator.js";
import { FetchCharacters, PushCharacters } from "./requests/Character.js";
const maxPointsAttribute = 70;
const maxPointsSkills = 10;

function App() {
	const [characters, setCharacters] = useState({});

	useEffect(() => {
		const Function = async () => {
			const charactersData = await FetchCharacters();
			if (
				charactersData.success &&
				charactersData.data?.message !== "Item not found"
			) {
				setCharacters(charactersData.data.body);
			}
		};
		Function();
	}, []);
	const incrementAttributeFunction = (id, attrb, incrementation) => {
		setCharacters((prevState) => {
			const character = prevState[id];
			const currentAttrbValue = character.attributeList[attrb];

			const totalAttributePointsUsed = Object.values(
				character.attributeList
			).reduce((res, cur) => {
				return res + cur;
			}, 0);

			const totalAttributePointsAvailabe =
				maxPointsAttribute - totalAttributePointsUsed;

			const newValue = currentAttrbValue + incrementation;
			if (incrementation > 0 && totalAttributePointsAvailabe <= 0)
				return prevState;
			else if (incrementation < 0 && newValue < 0) return prevState;
			return {
				...prevState,
				[id]: {
					...character,
					attributeList: {
						...character.attributeList,
						[attrb]: newValue,
					},
				},
			};
		});
	};

	const incrementSkillsFunction = (id, skill, incrementation) => {
		setCharacters((prevState) => {
			const character = prevState[id];
			const currentSkillValue = character.skillsList[skill].value;

			const totalSkillsPointsUsed = Object.values(
				character.skillsList
			).reduce((res, cur) => {
				return res + cur.value;
			}, 0);

			const totalSkillPointsAvailabe =
				maxPointsSkills +
				ModifierCalculator(characters[id].attributeList?.Intelligence) *
					4 -
				totalSkillsPointsUsed;

			const newValue = currentSkillValue + incrementation;
			if (incrementation > 0 && totalSkillPointsAvailabe <= 0)
				return prevState;
			else if (incrementation < 0 && newValue < 0) return prevState;
			return {
				...prevState,
				[id]: {
					...character,
					skillsList: {
						...character.skillsList,
						[skill]: {
							...prevState[id].skillsList[skill],
							value: newValue,
						},
					},
				},
			};
		});
	};

	const addNewCharacter = () => {
		setCharacters((prevState) => {
			const highestId = Math.max(
				...Object.keys(prevState).map(Number),
				0
			);
			return {
				...prevState,
				[highestId + 1]: {
					attributeList: ATTRIBUTE_LIST.reduce(
						(attr, currentAttr) => {
							attr[currentAttr] = 10;
							return attr;
						},
						{}
					),
					skillsList: SKILL_LIST.reduce((skills, currentSkill) => {
						skills[currentSkill.name] = {
							value: 0,
							attribute: currentSkill.attributeModifier,
						};
						return skills;
					}, {}),
				},
			};
		});
	};

	const deleteCharater = (id) => {
		setCharacters((prevState) => {
			const { [id]: _, ...newState } = prevState;
			return newState;
		});
	};

	const [skillCheck, setSkillCheck] = useState(null);
	const SkillCheckFunction = (characterId, skill, DC) => {
		const character = characters[characterId];
		const randomNumber = Math.floor(Math.random() * 20) + 1;
		const skillCharacter = character.skillsList[skill];
		const totalSkillPoints =
			skillCharacter.value +
			ModifierCalculator(
				character.attributeList[skillCharacter.attribute]
			);

		setSkillCheck({
			characterId,
			randomNumber,
			dCNumber: DC,
			skill,
			skillPoints: totalSkillPoints,
			successful: totalSkillPoints + randomNumber >= DC,
		});
	};

	const handleSaveCharacters = async () => {
		await PushCharacters(characters);
	};
	return (
		<div className="App">
			<header className="App-header">
				<h1>React Coding Exercise</h1>
			</header>
			<section>
				<p>Skill check results :</p>
				{skillCheck && (
					<>
						<p>Character {skillCheck.characterId} </p>
						<p>
							skill : {skillCheck.skill} :{" "}
							{skillCheck.skillPoints}{" "}
						</p>
						<p>Random Number {skillCheck.randomNumber} </p>
						<p>DC : {skillCheck.dCNumber} </p>
						<p>
							Result :{" "}
							{skillCheck.successful ? "Successful" : "Failed"}
						</p>
					</>
				)}
			</section>
			<section className="">
				<button onClick={addNewCharacter}>add new Character</button>
				<button onClick={handleSaveCharacters}>Save Characters</button>
				{Object.entries(characters).map(([id, values]) => (
					<section className="Container" key={id}>
						<Character
							characterId={id}
							character={values}
							incrementSkillsFunction={incrementSkillsFunction}
							incrementAttributeFunction={
								incrementAttributeFunction
							}
							deleteCharater={deleteCharater}
							SkillCheck={SkillCheckFunction}
						/>
					</section>
				))}
			</section>
		</div>
	);
}

export default App;
