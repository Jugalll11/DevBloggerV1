import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/lib/mongodb/userSchema';
import axios from 'axios';

export const options = {
    providers: [

        CredentialsProvider({
            name: "Email",
            credentials: {
                Email: {
                    label: "Email:",
                    type: "email",
                    placeholder: "your-geeky-email",
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-super-secret-password",
                },
            },
            async authorize(credentials) {
                const toFindEmail = credentials.Email;

                await connectMongoDB();
                const user = await User.findOne({ email: toFindEmail });

                if (user) {
                    console.log(user)
                    console.log(user.password)
                    console.log(credentials.password)
                    if (user.password == credentials.password) {
                        return user;
                    }
                    else {
                        console.log("Password incorrect")
                        return null;
                    }
                }
                else {
                    console.log("Email Incorrect")
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            console.log("User:", user);
            console.log("Account:", account)

            const accountType = account.provider;
            const name = user.name;
            const email = user.email;
            user.AccountType = account.provider
            console.log(user.AccountType)
            console.log(user)

            try {

                await connectMongoDB();
                const userExists = await User.findOne({ email })

                if (!userExists) {
                    const res = await fetch('http://localhost:4452/api/user/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            accountType
                        })
                    })

                    if (res.ok) {
                        console.log(res);
                        return user;
                    }
                }

            } catch (error) {
                console.log("Error: ", error)
                return null;
            }
            return user;

        },
        async session({ session, user, token }) {
            session.user.id = token.id
            session.user.pfp = (await axios.post('http://localhost:4452/api/user/getPFP', {id:token.id})).data.pfp;
            return session
        },

        async jwt({ token, user, account, profile, isNewUser }) {
            if (account) {
                const id = await axios.post('http://localhost:4452/api/user/getID', { email: user.email, accountType: account.provider })

                token.id = id.data._id;
            }
            return token

        }

    }
}