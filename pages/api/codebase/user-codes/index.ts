import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import clientPromise from "../../lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getSession({ req })
  if (session) {
    const database = (await clientPromise).db("baxhenhub")
    const codebase: any[] = []

    const user: any = await database
      .collection("users")
      .findOne({ email: session?.user?.email })

    const codes = user.codes || []

    await database
      .collection("codebase")
      .find()
      .forEach((item) => {
        if (codes.includes(item._id.toString())) codebase.push(item)
      })

    response.status(200).json(codebase)
    return
  }
  response.status(401).json({ message: "Unauthorized" })
}
