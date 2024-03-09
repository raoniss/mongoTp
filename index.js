import express from "express";
import {connecter} from "./db/config.js";
import routeLivre from "./routes/livreRoutes.js"
import routeAuteur from "./routes/auteurRoutes.js"
import routeLoaning from "./routes/loaningRoutes.js"
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/livre',routeLivre)
app.use('/auteur',routeAuteur)
app.use('/loaning',routeLoaning)

app.get("/", (req, res) => {
  console.log("salut les gars");
});
// mongodb://127.0.0.1:27017/
// mongodb+srv://aniss:FzOBM5qKIPdx8riL@cluster0.vlp3bdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
connecter("mongodb://127.0.0.1:27017/", (err) => {
  if (err) {
    console.log("Erreur lors de la connexion a la db");
    process.exit(-1);
  } else {
    console.log("connexion etablie");

    app.listen(3000);
    console.log("attente de requette au port 3000");
  }
});
