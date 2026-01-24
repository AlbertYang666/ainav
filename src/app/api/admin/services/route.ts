import { NextResponse } from 'next/server';
import { getAllAIServices } from '@/lib/data';

export async function GET() {
  try {
    const services = getAllAIServices();
    return NextResponse.json({ services });
  } catch (error) {
    console.error('Services error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
