import { NextRequest, NextResponse } from 'next/server'
import { bookingService } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const booking = await request.json()
    const newBooking = await bookingService.createBooking(booking)
    
    return NextResponse.json({ success: true, data: newBooking })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    )
  }
  }