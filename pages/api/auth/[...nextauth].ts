import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedinProvider from "next-auth/providers/linkedin";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../lib/mongodb";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
} from "../../../utils";
import axios from "axios";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET,
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          language: profile.locale.split("-")[0],
        };
      },
    }),
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          location: profile.location,
        };
      },
    }),
    LinkedinProvider({
      clientId: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      userinfo:
        "https://api.linkedin.com/v2/me?projection=(id,firstName,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))",
      profile: async (profile, tokens) => {
        const response = await axios.get(
          "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        );

        const elements = profile.profilePicture["displayImage~"].elements;

        return {
          id: profile.id,
          email: response.data.elements[0]["handle~"].emailAddress,
          language: profile.firstName.preferredLocale.language,
          name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
          image: elements[elements.length - 1].identifiers[0].identifier,
        };
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },

  pages: {
    signIn: "/auth/signin",
  },
});
