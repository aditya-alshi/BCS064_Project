const { app } = require('../index');
const PORT = 5000;

app.listen(PORT, () => {
    console.log("app is running on port " + PORT)
})