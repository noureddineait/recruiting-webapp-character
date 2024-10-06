import "../App.css";
import { ModifierCalculator } from "../utils/ModifierCalculator";

const Skills = ({
	characterId,
	skillsList,
	attributeList,
	incrementFunction,
	availableSkillsPoints,
}) => {
	return (
		<section className="Container">
			<h1>Skills</h1>
			<h4>Total Skills points available : {availableSkillsPoints}</h4>
			{Object.entries(skillsList).map(([skill, value]) => {
				const attributeModifier = ModifierCalculator(
					attributeList[value.attribute]
				);
				return (
					<div key={skill}>
						{skill} - points: {value.value}{" "}
						<button
							onClick={() =>
								incrementFunction(characterId, skill, 1)
							}
						>
							+
						</button>{" "}
						<button
							onClick={() =>
								incrementFunction(characterId, skill, -1)
							}
						>
							-
						</button>{" "}
						modifier ({value.attribute}): {attributeModifier} ||
						total:
						{value.value + attributeModifier}
					</div>
				);
			})}
		</section>
	);
};

export default Skills;
