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
                    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
                        username
                    ]);
    
                    if (user.rows.length === 0) {
                        return null
                    }
                    const validPassword = await bcrypt.compare(
                        password,
                        user.rows[0].password
                    );
            
                    if (!validPassword) {
                        return null
                    }
                    return user.rows[0];
                } catch (error) {
                    console.error(error.message);
                }
            }
        })
    ],

    session: {
        strategy: 'jwt'
    },
    secret: process.env.jwtsecret,
    pages: {
        signIn: '/login'
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}