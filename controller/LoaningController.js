import Loaning from "../model/loaning.js";
import client from "../db/config.js";
import { ObjectId } from "mongodb";
export const ajouterLoaning = async (req, res) => {
  try {
    let id = new ObjectId(req.body.livre);
    const cursor = client.db().collection("livre").find({ _id: id });
    const result1 = await cursor.toArray();
    if (result1.length > 0) {
      let loaning = new Loaning(
        req.body.livre,
        req.body.utilisateur,
        req.body.date_emprunt,
        req.body.date_de_retour_prévue,
        req.body.date_de_retour_effective
      );

      const result = await client.db().collection("Loaning").insertOne(loaning);
      await client
      .db()
      .collection("livre")
      .updateOne(
        { _id: id },
        {
          $set: {
            quantité_disponible: result1[0].quantité_disponible -1,
          },
        }
      );
      // console.log(result);
      res.status(200).json(result);
    //   res.status(200).json(result[0]);
    } else {
      res.status(204).json({ message: "ce livre pas trouvé" });
    }
    // console.log("coucou");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const getAllLoaning = async (req, res) => {
  try {
    const cursor = client.db().collection("Loaning").find();
    const result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ message: "Aucun Loaning trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAllLoaningByUser = async (req, res) => {
  try {
    let user = req.params.user;

    const cursor = client
      .db()
      .collection("Loaning")
      .find({ utilisateur: user });
    const result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ message: "Aucun Loaning trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getOneLoaning = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    const cursor = client.db().collection("Loaning").find({ _id: id });
    const result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ message: "ce Loaning pas trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteLoaning = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    const result = await client
      .db()
      .collection("Loaning")
      .deleteOne({ _id: id });
    // res.status(200).json(result);
    if (result.deletedCount == 1) {
      res.status(200).json({ message: "Suppression réussie" });
    } else {
      res.status(404).json({ message: "Cet Loaning n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
