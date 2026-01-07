import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const supabase = await createClient();
    
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('email', email);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `User ${email} is now an admin` 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to make admin' 
    }, { status: 500 });
  }
}