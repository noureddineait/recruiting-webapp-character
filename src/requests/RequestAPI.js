export async function requestAPI(url, method, body) {
	try {
		const response = await fetch(url, {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const responseText = await response.text();

		try {
			const responseBody = JSON.parse(responseText);
			return { success: response.ok, data: responseBody };
		} catch (e) {
			return { success: response.ok, data: undefined };
		}
	} catch (error) {
		console.log("RequestAPI (try/catch):", error);
		return { success: false };
	}
}
