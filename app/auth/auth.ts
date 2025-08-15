import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../api/auth/authOptions';


export function authenticateRequest(request: NextRequest) {
  console.log("Authenticating request...");
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  if (token !== process.env.AUTH_SECRET) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  return null; // ✅ Null means authentication succeeded

}

export async function authenticateAdminRequest(request: NextRequest) {
  console.log("Authenticating admin request...");
  const session = await getServerSession(authOptions);
  // Log the session for debugging
  console.log('API Route Session:', session);

  // Check if a session exists
  if (!session) {
    console.log('Unauthorized access: No session found.');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Optional: Add role-based authorization check here
  // For example, if only 'admin' users should access these APIs
  if (session.user && session.user.id !== 'admin') {
    console.log('Forbidden access: User is not an admin.');
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  // If authenticated and authorized, return the session
  return session;
} 
