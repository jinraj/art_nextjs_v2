import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../api/auth/authOptions';
import { Role } from '@prisma/client';

export async function authenticateRequestByRole(requiredRoles?: Role[]) {
  console.log("Authenticating admin request...");
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log('Unauthorized access: No session found.');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userRole = session.user?.role as Role | undefined;

  // ✅ Check if role is valid and in the allowed roles
  if (!userRole || (requiredRoles && !requiredRoles.includes(userRole))) {
    console.log('Forbidden access: User does not have required role.');
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  if (session.user && !session.user.isApproved) {
    console.log('Forbidden access: User is not approved.'); 
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  return session;
}

export async function authenticateRequestBySession() {
  console.log("Authenticating admin request...");
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log('Unauthorized access: No session found.');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userRole = session.user?.role as Role | undefined;

  // Check if role is valid
  if (!userRole) {
    console.log('Forbidden access: User does not have required role.');
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  if (session.user && !session.user.isApproved) {
    console.log('Forbidden access: User is not approved.'); 
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  return session;
}