import connectMongo from "../../lib/mongodb";
import User from "../../models/Users"
import { NextResponse } from "next/server";

//  CREATE
export async function POST(req: Request) {
    try {
        await connectMongo();
        const { name, email } = await req.json();
        const newUser = new User({ name, email });
        await newUser.save();
        return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
    }
}

//  READ
export async function GET() {
    try {
        await connectMongo();
        const users = await User.find();
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
    }
}