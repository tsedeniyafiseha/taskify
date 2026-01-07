import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function GET() {
  try {
    const supabase = createClient();
    
    // Test categories table
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .limit(3);
    
    // Test locations table
    const { data: locations, error: locError } = await supabase
      .from('locations')
      .select('*')
      .limit(3);

    if (catError || locError) {
      return NextResponse.json({
        connected: false,
        error: catError?.message || locError?.message,
      }, { status: 500 });
    }

    return NextResponse.json({
      connected: true,
      message: 'Database connected successfully!',
      data: {
        categoriesCount: categories?.length || 0,
        locationsCount: locations?.length || 0,
        sampleCategories: categories?.map(c => c.name),
        sampleLocations: locations?.map(l => l.name),
      }
    });
  } catch (error) {
    return NextResponse.json({
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
