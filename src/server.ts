import { app } from "./app";
import { env } from "./env";

const PORT = env.PORT

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))