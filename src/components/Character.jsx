import { useState } from "react";
import "../App.css";
import { SKILL_LIST } from "../consts";
import { ModifierCalculator } from "../utils/ModifierCalculator";
import Attributes from "./Attributes";
import Classes from "./Classes";
import Skills from "./Skills";
const maxPointsSkills = 10;
const Character = ({
	characterId,
	character,
	incrementSkillsFunction,
	incrementAttributeFunction,
	deleteCharater,
	SkillCheck,
}) => {
	const [skillCheckValue, setSkillCheckValue] = useState(SKILL_LIST[0].name);
	const [DC, setDC] = useState(1);
	const attributeList = character.attributeList;
	const skillsList = character.skillsList;

	const totalSkillsPointsUsed = Object.values(skillsList).reduce(
		(res, cur) => {
			res += cur.value;
			return res;
		},
		0
	);
	const totalSkillPointsAvailabe =
		maxPointsSkills +
		ModifierCalculator(attributeList?.Intelligence) * 4 -
		totalSkillsPointsUsed;
	const handleRoll = (characterId) => {
		if (skillCheckValue && DC) SkillCheck(characterId, skillCheckValue, DC);
	};
	return (
		<section>
			Character {characterId}
			<div>
				Skills
				<select
					value={skillCheckValue}
					onChange={(e) => setSkillCheckValue(e.target.value)}
				>
					{SKILL_LIST.map((skill) => (
						<option key={skill.name} value={skill.name}>
							{skill.name}
						</option>
					))}
				</select>
				DC
				<input
					type="number"
					min={1}
					value={DC}
					onChange={(e) => setDC(e.target.value)}
				/>
				<button onClick={() => handleRoll(characterId)}>Roll</button>
			</div>
			<div className="App-section">
				<Attributes
					characterId={characterId}
					attributeList={character.attributeList}
					incrementFunction={incrementAttributeFunction}
				/>
				<Classes attributeList={character.attributeList} />
				<Skills
					characterId={characterId}
					skillsList={character.skillsList}
					attributeList={character.attributeList}
					incrementFunction={incrementSkillsFunction}
					availableSkillsPoints={totalSkillPointsAvailabe}
				/>
			</div>
			<button onClick={() => deleteCharater(characterId)}>delete</button>
		</section>
	);
};

export default Character;
