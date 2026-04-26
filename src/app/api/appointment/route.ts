import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Appointment from '@/app/models/Appointment';

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const appointment = await Appointment.create(body);

  return NextResponse.json(appointment);
}

export async function GET() {
  await connectDB();

  const appointments = await Appointment.find().sort({ createdAt: -1 });

  return NextResponse.json(appointments);
}