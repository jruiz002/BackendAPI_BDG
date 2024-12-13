"use strict"

const app = require("./configs/app")
const mongoConfig = require("./configs/mongoConfigs")
const PORT = 3000

mongoConfig.init();

app.listen(PORT, () => {
    console.log(`Server running to port ${PORT}`)
});