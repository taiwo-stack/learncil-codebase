import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { name, email, role, password, assignedInstructor, secondaryEmail } = await request.json();

    // Validate required fields
    if (!name || !email || !role || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Generate the proper email domain based on role
    const emailDomain = role === 'student' ? '.student@learncil.com' : '.instructor@learncil.com';
    const fullEmail = `${email}${emailDomain}`;

    // Check if user already exists in Firestore
    const usersRef = adminDb.collection('users');
    const existingUserQuery = await usersRef.where('email', '==', fullEmail).get();

    if (!existingUserQuery.empty) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 400 }
      );
    }

    // Create user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email: fullEmail,
      password: password,
      displayName: name,
    });

    // Set custom claims for role-based access
    await adminAuth.setCustomUserClaims(userRecord.uid, {
      role: role,
    });

    // Create user profile in Firestore
    const userProfile = {
      uid: userRecord.uid,
      name: name,
      email: fullEmail,
      role: role,
      assignedInstructor: role === 'student' ? (assignedInstructor || null) : null,
      secondaryEmail: role === 'student' ? (secondaryEmail || null) : null,
      createdAt: new Date(),
      lastLogin: null,
      passwordSet: true,
      permanentPassword: password,
    };

    await usersRef.doc(userRecord.uid).set(userProfile);

    return NextResponse.json({
      success: true,
      user: {
        uid: userRecord.uid,
        name: name,
        email: fullEmail,
        role: role,
      },
      message: `User created successfully! The user can log in with:\n\nEmail: ${fullEmail}\nPassword: ${password}`
    });

  } catch (error: any) {
    console.error('Error creating user:', error);

    // Handle specific Firebase Auth errors
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 400 }
      );
    }

    if (error.code === 'auth/invalid-email') {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (error.code === 'auth/weak-password') {
      return NextResponse.json(
        { error: 'Password is too weak' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create user. Please try again.' },
      { status: 500 }
    );
  }
}