import { NextRequest, NextResponse } from 'next/server'
import { tourService } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let tours
    if (category) {
      tours = await tourService.getToursByCategory(category)
    } else {
      tours = await tourService.getAllTours()
    }
    
    return NextResponse.json({ success: true, data: tours })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tours' },
      { status: 500 }
    )
  }
}