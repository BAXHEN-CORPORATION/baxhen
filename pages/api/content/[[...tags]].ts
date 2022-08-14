import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ContentResponse } from "types";
import clientPromise from "../lib/mongodb";

//TODO add pagination later

export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse
) {
  const database = (await clientPromise).db("baxhenhub");
  const content: any[] = [];

  const { tags } = req.query;

  await database
    .collection<ContentResponse>("content")
    .find()
    .forEach((item) => {
      const includesIds = item.tags.some((tag) => tags.includes(tag));

      if (includesIds) {
        content.push(item);
      }
    });

  response.status(200).json(content);
}
