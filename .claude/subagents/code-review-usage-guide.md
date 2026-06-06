# Code Review Agent - Usage Guide

## 🚀 How to Use This Agent

### **Basic Usage**
```
"Review the Laravel authentication system for security vulnerabilities"
"Audit the payment processing code in CheckoutController.php"
"Analyze the React components for XSS vulnerabilities and security issues"
"Review the database migrations for potential data leaks"
```

### **Specific Task Examples**

#### **Security Focused**
```
"Conduct a security audit of the user registration and login flows"
"Review the API endpoints for authentication bypass vulnerabilities"
"Analyze the file upload functionality for security issues"
"Check for hardcoded credentials and sensitive data exposure"
"Review the session management implementation"
```

#### **Code Quality Focused**
```
"Review the error handling across the application for best practices"
"Analyze the database query efficiency and potential N+1 problems"
"Review the component architecture for maintainability issues"
"Check for code duplication and refactoring opportunities"
"Analyze the async/await usage for race conditions"
```

#### **Comprehensive Audit**
```
"Perform a complete security and quality audit of the payment processing module"
"Review the entire authentication and authorization system"
"Audit the application for OWASP Top 10 vulnerabilities"
"Conduct a GDPR compliance review of user data handling"
```

## 📋 Sample Prompts by Context

### **For New Feature Review**
```
"Review the new chat feature implementation for:
1. WebSocket security vulnerabilities
2. Message sanitization and XSS prevention
3. Authorization checks for private conversations
4. Rate limiting for message sending
5. Input validation on file uploads"

Context: This is a real-time chat feature for authenticated users.
Files: resources/js/components/Chat.jsx, app/Http/Controllers/ChatController.php
```

### **For API Review**
```
"Review the REST API implementation for security vulnerabilities:
- Authentication and authorization
- Input validation and sanitization
- SQL injection prevention
- Rate limiting and abuse prevention
- Error message information leakage

Focus on: routes/api.php and all controllers"
```

### **For Database Security**
```
"Audit the database layer for:
1. SQL injection vulnerabilities
2. Sensitive data encryption
3. Proper indexing for performance
4. Data retention compliance
5. Backup and recovery security"

Files: database/migrations/, app/Models/
```

### **For Frontend Security**
```
"Review the React application for:
1. XSS vulnerabilities in user-generated content
2. Secure state management
3. Authentication token storage
4. API call security
5. Third-party library vulnerabilities"

Files: resources/js/
```

## 🎯 Getting Best Results

### **Provide Context**
```
❌ "Review this code"
✅ "Review this admin panel code for authorization issues.
    Context: This panel manages user permissions and can
    modify any user's access level. It's only accessible
    to super admins."
```

### **Specify Scope**
```
❌ "Review the Laravel app"
✅ "Review the authentication flow in:
    - app/Http/Controllers/Auth/LoginController.php
    - app/Http/Middleware/Authenticate.php
    - resources/js/components/Auth/Login.jsx"
```

### **Define Requirements**
```
❌ "Check for security issues"
✅ "Review for:
    - OWASP Top 10 vulnerabilities
    - GDPR compliance in user data handling
    - PCI-DSS requirements for payment processing
    - Session fixation vulnerabilities"
```

## 📊 Output Interpretation

### **Risk Level Guide**
- 🔴 **Critical**: Stop deployment, fix immediately
- 🟠 **High**: Fix within 24-48 hours
- 🟡 **Medium**: Fix within 1 week
- 🔵 **Low**: Improve when possible

### **Prioritization Strategy**
1. **Fix all Critical issues** before deploying
2. **Address High issues** in next sprint
3. **Plan Medium issues** for upcoming iterations
4. **Track Low issues** for technical debt backlog

## 🔄 Integration into Development Workflow

### **Pre-Commit Review**
```
"Quick security review of the password reset feature
before commit. Focus on authentication bypass
and token security."
```

### **Pull Request Review**
```
"Comprehensive security and quality review of
PR #123: Implement file upload feature.
Check for: file upload vulnerabilities,
malicious file prevention, storage security."
```

### **Deployment Audit**
```
"Final security audit before production deployment.
Review all changes since last release for:
- New security vulnerabilities
- Performance regressions
- Configuration issues
- Dependency vulnerabilities"
```

## 🛡️ Security Checklist Integration

### **Regular Reviews**
- Weekly dependency scanning
- Monthly security audits
- Quarterly penetration testing review
- Annual comprehensive security assessment

### **Trigger-Based Reviews**
- After security incident
- Before major feature release
- After dependency updates
- After team changes

## 📈 Measuring Improvement

### **Track Metrics**
- Number of critical vulnerabilities found
- Time to fix security issues
- Code security score over time
- Test coverage improvements
- Performance metrics

### **Success Indicators**
- Decreasing critical vulnerabilities
- Faster security review turnaround
- Improved developer security awareness
- Better test coverage
- Cleaner code audits

## 💡 Tips for Maximum Effectiveness

1. **Be Specific**: The more specific your request, the better the review
2. **Provide Context**: Business context helps prioritize findings
3. **Iterate**: Start with broad review, then narrow down to specific concerns
4. **Follow Up**: Ask for clarification on any findings
5. **Track Progress**: Monitor fixes and improvements over time

## 🚨 When to Escalate

**Seek human security expert review when:**
- Dealing with complex cryptographic implementations
- Assessing novel attack vectors
- Evaluating compliance with specific regulations
- Reviewing critical payment or authentication systems
- Handling security incident response

---

This agent is a powerful tool but should complement, not replace, human security expertise and regular security assessments by qualified professionals.