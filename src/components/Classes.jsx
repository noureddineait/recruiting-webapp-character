import { useState } from "react";
import { CLASS_LIST } from "../consts";
import "../App.css";

const Classes = ({ attributeList }) => {
	const [showRequirements, setShowRequirements] = useState("");

	const characterMeetsClass = (className) => {
		const classValues = CLASS_LIST[className];

		return Object.entries(classValues).every(([attr, value]) => {
			return attributeList[attr] >= value;
		});
	};
	return (
		<section className="Container">
			<h1>Classes</h1>
			<div>
				{Object.entries(CLASS_LIST).map(([className, values]) => {
					return (
						<Class
							key={className}
							name={className}
							values={values}
							active={characterMeetsClass(className)}
							setShowRequirements={setShowRequirements}
						/>
					);
				})}
			</div>
			{showRequirements && (
				<div className="Container">
					<strong>{showRequirements}</strong>
					{Object.entries(CLASS_LIST[showRequirements]).map(
						([attrb, value]) => (
							<span>
								{attrb} : {value}
							</span>
						)
					)}
					<button onClick={() => setShowRequirements("")}>
						hide
					</button>
				</div>
			)}
		</section>
	);
};

const Class = ({ name, active, setShowRequirements }) => {
	return (
		<div
			style={{
				color: active && "red",
			}}
		>
			<p onClick={() => setShowRequirements(name)}>{name}</p>
		</div>
	);
};
export default Classes;
