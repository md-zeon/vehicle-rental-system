import app from "./app";
import CONFIG from "./config";

const PORT = CONFIG.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running`);
});
