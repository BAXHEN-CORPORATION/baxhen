import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse
) {
  const database = (await clientPromise).db("baxhenhub");
  const codebase: any[] = [];

  await database
    .collection("codebase")
    .find({}, { projection: { src: 0 } })
    .forEach((item) => {
      // console.log({ item })
      codebase.push(item);
    });

  response.status(200).json(codebase);
}
