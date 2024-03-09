import Livre from "../model/livre.js";
import client from "../db/config.js";
import { ObjectId } from "mongodb";
export const ajouterLivre = async (req, res) => {
  try {
    // console.log("coucou");
    let livre = new Livre(
      req.body.titre,
      req.body.auteurs,
      req.body.année_de_publication,
      req.body.genres,
      req.body.quantité_disponible
    );

    const result = await client.db().collection("livre").insertOne(livre);
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const getAllLivre = async (req, res) => {
  try {
    const cursor = client.db().collection("livre").find();
    const result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ message: "Aucun livre trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAllLivreByGender = async (req, res) => {
    try {
    let genre = req.params.genre

      const cursor = client.db().collection("livre").find({genres:genre});
      const result = await cursor.toArray();
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).json({ message: "Aucun livre trouvé" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  export const getAllLivreByAutor = async (req, res) => {
    try {
    let auteur = req.params.auteur

      const cursor = client.db().collection("livre").find({auteurs:auteur});
      const result = await cursor.toArray();
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).json({ message: "Aucun livre trouvé" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

export const getOneLivre = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    const cursor = client.db().collection("livre").find({ _id: id });
    const result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ message: "ce livre pas trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateLivre = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    let newtitre = req.body.titre;
    let newauteurs = req.body.auteurs;
    let newannée_de_publication = req.body.année_de_publication;
    let newgenres = req.body.genres;
    let newquantité_disponible = req.body.quantité_disponible;
    const result = await client
      .db()
      .collection("livre")
      .updateOne(
        { _id: id },
        {
          $set: {
            titre: newtitre,
            auteurs: newauteurs,
            année_de_publication: newannée_de_publication,
            genres: newgenres,
            quantité_disponible: newquantité_disponible,
          },
        }
      );
    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "Modification réussie" });
    } else {
      res.status(404).json({ message: "Cet livre n'existe pas" });
    }
    // res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteLivre = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    const result = await client.db().collection("livre").deleteOne({ _id: id });
    // res.status(200).json(result);
    if (result.deletedCount == 1) {
      res.status(200).json({ message: "Suppression réussie" });
    } else {
      res.status(404).json({ message: "Cet livre n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
