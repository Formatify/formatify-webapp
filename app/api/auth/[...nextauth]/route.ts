import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import User from "@/models/User";
import connect from "@/utils/db";
import clientPromise from "@/lib/mongodb";

export const authOptions: any = {

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User does not exist");
          }

          if (!user.isVerified) {
            throw new Error("User is not verified");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          const { password, OTP, ...userWithoutPassword } = user.toObject();
          return userWithoutPassword;
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // Expire in 30 minutes
  },
  callbacks: {
    async signIn({ user, profile, credentials }: any) {
      await connect();

      if (profile) {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = new User({
            userName: profile?.name || "",
            email: user.email,
            password: undefined,
            country: "",
            city: "",
            university: "",
            department: "",
            subscription: "",
            verificationToken: undefined,
            isVerified: true,
            OTP: null,
            imageUrl: user.image,
            isSocialSignup: true,
          });
          await newUser.save();
        }
      } else {
        const existingUser = await User.findOne({ email: credentials.email });

        if (!existingUser) {
          throw new Error("User does not exist");
        }

        if (!existingUser.isVerified) {
          throw new Error("User is not verified");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        const { password, OTP, ...userWithoutPassword } = existingUser.toObject();
        return userWithoutPassword;
      }
      return { email: user.email, name: profile?.name, image: user.image };
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, user, token }: { session: any; user: any, token: any }) {
      console.log({ session, token, user })
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },

};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
