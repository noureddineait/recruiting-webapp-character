import "../App.css";
import { ModifierCalculator } from "../utils/ModifierCalculator";
const Attributes = ({ characterId, attributeList, incrementFunction }) => {
	return (
		<section className="Container">
			<h1>Attributes</h1>
			{Object.entries(attributeList).map(([attrb, value]) => {
				return (
					<div key={attrb}>
						{attrb} : {value} (modifier: {ModifierCalculator(value)}
						)
						<button
							onClick={() =>
								incrementFunction(characterId, attrb, 1)
							}
						>
							+
						</button>
						<button
							onClick={() =>
								incrementFunction(characterId, attrb, -1)
							}
						>
							-
						</button>
					</div>
				);
			})}
		</section>
	);
};

export default Attributes;
