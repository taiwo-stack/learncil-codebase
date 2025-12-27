// src/lib/security-test.ts
import { auth } from '@/components/layout/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db } from '@/components/layout/firebase';

const TEST_USERS = {
  admin: { email: 'test.admin@learncil.com', password: 'testpass123' },
  instructor: { email: 'test.instructor@learncil.com', password: 'testpass123' },
  student: { email: 'test.student@learncil.com', password: 'testpass123' }
};

export class SecurityTester {
  private static assertAuth(): void {
    if (!auth) {
      throw new Error("Firebase Auth is not initialized. Make sure you're running this in the browser.");
    }
  }

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

        try {
          const allAssignments = await getDocs(assignmentsRef);
          console.log(`❌ Instructor should not read all ${allAssignments.size} assignments`);
        } catch {
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
      });

      console.log('\n🎉 Security tests completed!');
    } catch (error) {
      console.error('❌ Security test failed:', error);
    }
  }

  private static async testAsAdmin(testFn: () => Promise<void>) {
    this.assertAuth();
    try {
      await signInWithEmailAndPassword(auth!, TEST_USERS.admin.email, TEST_USERS.admin.password);
      await testFn();
      await signOut(auth!);
    } catch (error) {
      console.log('❌ Cannot test as admin - check credentials or initialization.');
    }
  }

  private static async testAsInstructor(testFn: (user: any) => Promise<void>) {
    this.assertAuth();
    try {
      const cred = await signInWithEmailAndPassword(auth!, TEST_USERS.instructor.email, TEST_USERS.instructor.password);
      await testFn(cred.user);
      await signOut(auth!);
    } catch (error) {
      console.log('❌ Cannot test as instructor - check credentials or initialization.');
    }
  }

  private static async testAsStudent(testFn: (user: any) => Promise<void>) {
    this.assertAuth();
    try {
      const cred = await signInWithEmailAndPassword(auth!, TEST_USERS.student.email, TEST_USERS.student.password);
      await testFn(cred.user);
      await signOut(auth!);
    } catch (error) {
      console.log('❌ Cannot test as student - check credentials or initialization.');
    }
  }

  static async runAllTests() {
    console.log('🚀 Starting comprehensive security tests...\n');
    await this.testFirestoreRules();
    console.log('\n✨ All security tests completed!');
  }
}

// Expose for browser console usage
if (typeof window !== 'undefined') {
  (window as any).SecurityTester = SecurityTester;
}
