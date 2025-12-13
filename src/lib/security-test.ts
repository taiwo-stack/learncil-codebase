/**
 * Security Test Utility
 * This file contains functions to test the security implementation
 * Run these tests to verify that the strict Firestore rules and AuthGuard work correctly
 */

import { auth, db } from '@/components/layout/firebase';
import { collection, query, where, getDocs, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Test user credentials (these should be created by admin first)
const TEST_USERS = {
  admin: { email: 'test.admin@learncil.com', password: 'testpass123' },
  instructor: { email: 'test.instructor@learncil.com', password: 'testpass123' },
  student: { email: 'test.student@learncil.com', password: 'testpass123' }
};

export class SecurityTester {
  static async testFirestoreRules() {
    console.log('🧪 Testing Firestore Security Rules...\n');

    try {
      // Test 1: Admin can read all users
      console.log('Test 1: Admin reading all users');
      await this.testAsAdmin(async () => {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        console.log(`✅ Admin can read ${snapshot.size} users`);
      });

      // Test 2: Instructor can only see their assignments
      console.log('\nTest 2: Instructor assignment access');
      await this.testAsInstructor(async (user) => {
        const assignmentsRef = collection(db, 'courseAssignments');
        const q = query(assignmentsRef, where('instructorId', '==', user.uid));
        const snapshot = await getDocs(q);
        console.log(`✅ Instructor can read ${snapshot.size} of their assignments`);

        // Try to read all assignments (should fail)
        try {
          const allAssignments = await getDocs(assignmentsRef);
          console.log(`❌ Instructor should not read all ${allAssignments.size} assignments`);
        } catch (error) {
          console.log('✅ Instructor correctly blocked from reading all assignments');
        }
      });

      // Test 3: Student can only see their assignments
      console.log('\nTest 3: Student assignment access');
      await this.testAsStudent(async (user) => {
        const assignmentsRef = collection(db, 'courseAssignments');
        const q = query(assignmentsRef, where('studentId', '==', user.uid));
        const snapshot = await getDocs(q);
        console.log(`✅ Student can read ${snapshot.size} of their assignments`);
      });

      // Test 4: Only admin can create courses
      console.log('\nTest 4: Course creation permissions');
      await this.testAsAdmin(async () => {
        try {
          const coursesRef = collection(db, 'courses');
          await addDoc(coursesRef, {
            title: 'Security Test Course',
            description: 'Test course for security validation',
            category: 'Security',
            price: 0,
            duration: '1 hour',
            level: 'beginner',
            status: 'draft',
            outcome: 'Learn security testing',
            enrolledStudents: 0,
            rating: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          console.log('✅ Admin can create courses');
        } catch (error: any) {
          console.log('❌ Admin cannot create courses:', error.message);
        }
      });

      console.log('\n🎉 Security tests completed!');

    } catch (error) {
      console.error('❌ Security test failed:', error);
    }
  }

  private static async testAsAdmin(testFn: () => Promise<void>) {
    try {
      await signInWithEmailAndPassword(auth, TEST_USERS.admin.email, TEST_USERS.admin.password);
      await testFn();
      await signOut(auth);
    } catch (error) {
      console.log('❌ Cannot test as admin - user may not exist or credentials invalid');
    }
  }

  private static async testAsInstructor(testFn: (user: any) => Promise<void>) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, TEST_USERS.instructor.email, TEST_USERS.instructor.password);
      await testFn(userCredential.user);
      await signOut(auth);
    } catch (error) {
      console.log('❌ Cannot test as instructor - user may not exist or credentials invalid');
    }
  }

  private static async testAsStudent(testFn: (user: any) => Promise<void>) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, TEST_USERS.student.email, TEST_USERS.student.password);
      await testFn(userCredential.user);
      await signOut(auth);
    } catch (error) {
      console.log('❌ Cannot test as student - user may not exist or credentials invalid');
    }
  }

  static async runAllTests() {
    console.log('🚀 Starting comprehensive security tests...\n');
    await this.testFirestoreRules();
    console.log('\n✨ All security tests completed!');
  }
}

// Export for use in browser console or test files
if (typeof window !== 'undefined') {
  (window as any).SecurityTester = SecurityTester;
}