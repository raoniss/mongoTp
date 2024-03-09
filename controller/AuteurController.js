import Auteur from "../model/auteur.js";
import client from "../db/config.js";
import { ObjectId } from "mongodb";
export const ajouterAuteur = async (req, res) => {
  try {
    // console.log("coucou");
    let auteur = new Auteur (
      req.body.nom,
      req.body.date_de_naissance,
      req.body.nationalité
    );

    const result = await client.db().collection("Auteur").insertOne(auteur);
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const getAllAuteur = async (req, res) => {
  try {
    const cursor = client.db().collection("Auteur").find();
    const result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ message: "Aucun Auteur trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


export const getOneAuteur = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    const cursor = client.db().collection("Auteur").find({ _id: id });
    const result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ message: "ce Auteur pas trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateAuteur = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    let newnom = req.body.nom;
    let newdate_de_naissance = req.body.date_de_naissance;
    let newnationalité = req.body.nationalité;
    const result = await client
      .db()
      .collection("Auteur")
      .updateOne(
        { _id: id },
        {
          $set: {
            nom: newnom,
            date_de_naissance: newdate_de_naissance,
            nationalité: newnationalité,
          },
        }
      );
    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "Modification réussie" });
    } else {
      res.status(404).json({ message: "Cet Auteur n'existe pas" });
    }
    // res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteAuteur = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    const result = await client.db().collection("Auteur").deleteOne({ _id: id });
    // res.status(200).json(result);
    if (result.deletedCount == 1) {
      res.status(200).json({ message: "Suppression réussie" });
    } else {
      res.status(404).json({ message: "Cet Auteur n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
