import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import pool from "../../../../util/db";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { username, password } = credentials;
                try {
                    const user = (await pool.query("SELECT * FROM users WHERE username = $1", [
                        username
                    ])).rows[0];
                    if (!user) {
                        return null
                    }
                    const validPassword = await bcrypt.compare(
                        password,
                        user.password
                    );
            
                    if (!validPassword) {
                        return null
                    }

                    return user
                } catch (error) {
                    console.error(error.message);
                }
            }
        })
    ],

    session: {
        jwt: true,
        strategy: 'jwt',
    },
    callbacks: {
        jwt: ({ token, user }) => {
          if (user) {
            token.user = user.username;
            token.tipo_user = user.tipo_user;
          }
          return token;
        },
        session: ({ session, token }) => {
          if (token) {
            session.user = token.user;
            session.tipo_user = token.tipo_user;
          }
          return session;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
        verifyRequest: '/login',
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}