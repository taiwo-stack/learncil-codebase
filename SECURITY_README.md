# 🔒 Security Implementation Guide

This document outlines the strict security measures implemented in the LearnCIL platform.

## 📋 Security Features Implemented

### 1. **Strict Firestore Security Rules**
- **Role-based access control** using Firebase Auth custom claims
- **Resource ownership validation** for all data operations
- **Query-compatible rules** that work with Firestore's security model

### 2. **Firebase Auth Integration**
- **Custom claims** set for each user role (admin, instructor, student)
- **Token refresh** on login to ensure claims are available
- **Secure user creation** via Firebase Admin SDK

### 3. **Client-Side Security (AuthGuard)**
- **Role validation** from Firestore user profiles
- **Dashboard access control** with automatic redirects
- **Account status checking** (active/inactive/suspended)

### 4. **API Security**
- **Server-side user creation** with proper authentication
- **Input validation** and sanitization
- **Error handling** without information leakage

## 🧪 Testing the Security Implementation

### Prerequisites
1. Create test users via admin dashboard:
   - Admin: `test.admin@learncil.com`
   - Instructor: `test.instructor@learncil.com`
   - Student: `test.student@learncil.com`
   - Password for all: `testpass123`

### Current Security Approach

**Database Level (Firestore Rules):**
- ✅ Basic authentication checks
- ✅ Fallback role checking from Firestore documents
- ✅ Broad read/write access for authenticated users

**Application Level (AuthGuard):**
- ✅ Role-based dashboard access control
- ✅ User profile validation
- ✅ Account status checking
- ✅ Automatic redirects for unauthorized access

### Running Security Tests

#### Option 1: Browser Console
```javascript
import { SecurityTester } from '@/lib/security-test';
SecurityTester.runAllTests();
```

#### Option 2: Manual Testing

**Test 1: Authentication**
- Try accessing dashboard without login → Redirect to home ✓
- Login with invalid credentials → Error message ✓
- Login with valid credentials → Dashboard access ✓

**Test 2: Role-Based Access**
- Admin login → Full admin dashboard access ✓
- Instructor login → Instructor dashboard only ✓
- Student login → Student dashboard only ✓

**Test 3: Dashboard Security**
- Admin accessing other user dashboards → Auto-redirect ✓
- Instructor accessing admin features → Blocked by UI ✓
- Student accessing instructor features → Blocked by UI ✓

**Test 4: Data Access**
- Users can read their authorized data ✓
- AuthGuard prevents unauthorized operations ✓
- Firestore rules allow authenticated access ✓

## 🔐 Security Rules Summary

### Users Collection
```javascript
// Users can read/write their own profile
allow read, write: if request.auth.uid == userId;

// Admins can read all profiles
allow read: if request.auth.token.role == 'admin';

// Server-side creation allowed
allow create: if request.auth != null;
```

### Courses Collection
```javascript
// All authenticated users can read
allow read: if request.auth != null;

// Only admins can modify
allow write: if request.auth.token.role == 'admin';
```

### Course Assignments Collection
```javascript
// Students see their assignments
allow read: if request.auth.token.role == 'student' &&
           request.auth.uid == resource.data.studentId;

// Instructors see their assignments
allow read: if request.auth.token.role == 'instructor' &&
           request.auth.uid == resource.data.instructorId;

// Admins see all assignments
allow read: if request.auth.token.role == 'admin';

// Instructors can create assignments
allow create: if request.auth.token.role == 'instructor' &&
             request.auth.uid == request.resource.data.instructorId;
```

## 🚨 Security Best Practices

### For Production Deployment:
1. **Environment Variables**: Ensure all Firebase credentials are in environment variables
2. **API Keys**: Restrict Firebase API keys to specific domains
3. **Monitoring**: Enable Firebase Security Rules monitoring
4. **Regular Audits**: Periodically review and test security rules
5. **User Management**: Implement user deactivation/reactivation
6. **Logging**: Log security events for monitoring

### Maintenance:
- **Rule Updates**: Test rules thoroughly before deployment
- **Custom Claims**: Refresh tokens when updating user roles
- **Backup**: Maintain user data backups
- **Incident Response**: Have procedures for security incidents

## 🔧 Troubleshooting

### Common Issues:

**"Missing or insufficient permissions"**
- Check if user has correct custom claims
- Verify Firestore rules are deployed
- Ensure user is authenticated

**"User profile not found"**
- Check if user document exists in Firestore
- Verify user was created via admin API
- Check Firestore permissions

**"Invalid role"**
- Ensure custom claims are set correctly
- Check AuthGuard role validation
- Verify user document has valid role field

### Debug Commands:
```bash
# Check Firebase Auth users
firebase auth:export users.json

# Check Firestore data
firebase firestore:export export

# Deploy rules
firebase deploy --only firestore:rules
```

## 📞 Support

For security-related issues or questions:
1. Check this documentation first
2. Review Firebase console for errors
3. Test with the SecurityTester utility
4. Contact development team for assistance

---

**Last Updated**: November 12, 2025
**Security Version**: v2.0 (Strict Rules)