# Code Review Agent - Quick Reference Card

## 🎯 One-Line Prompts

### **Security Reviews**
```
"Review [FILE] for OWASP Top 10 vulnerabilities"
"Check [FEATURE] for authentication bypass vulnerabilities"
"Audit [CONTROLLER] for SQL injection and XSS issues"
"Review [API] for authorization and rate limiting problems"
"Analyze [FRONTEND] for XSS and CSRF vulnerabilities"
```

### **Quality Reviews**
```
"Review [CODE] for performance and maintainability issues"
"Check [FILES] for code duplication and refactoring opportunities"
"Analyze [COMPONENTS] for React best practices and patterns"
"Review [DATABASE QUERIES] for optimization opportunities"
"Check [ERROR HANDLING] for exception management issues"
```

### **Comprehensive Audits**
```
"Full security audit of [MODULE] with focus on authentication, authorization, and data protection"
"Complete review of [FEATURE] including security, performance, and code quality"
"Comprehensive audit of [SYSTEM] for OWASP compliance and best practices"
```

## 🔍 Common Security Checks

### **Authentication & Authorization**
```
"Review authentication flow for bypass vulnerabilities and session fixation"
"Check authorization checks on all [ENDPOINT] routes"
"Analyze permission system for privilege escalation vulnerabilities"
```

### **Data Protection**
```
"Review [FEATURE] for PII handling and GDPR compliance"
"Check data encryption implementation for sensitive information"
"Audit logging practices for security event monitoring"
```

### **Input Validation**
```
"Review form validation for XSS and injection vulnerabilities"
"Check API input sanitization and validation practices"
"Analyze file upload security and malicious file prevention"
```

### **API Security**
```
"Review REST API for authentication, rate limiting, and CORS issues"
"Check API endpoints for IDOR and authorization bypass"
"Audit error responses for information leakage"
```

## 🎨 Language-Specific Quick Prompts

### **PHP/Laravel**
```
"Review Laravel controllers for mass assignment vulnerabilities"
"Check Blade templates for XSS vulnerabilities"
"Analyze Eloquent queries for N+1 problems and SQL injection"
"Review middleware implementation for authentication bypass"
```

### **JavaScript/React**
```
"Review React components for XSS in user-generated content"
"Check state management for sensitive data exposure"
"Analyze API calls for proper error handling and security"
"Review useEffect dependencies for race conditions"
```

### **Database**
```
"Review migrations for sensitive data handling"
"Check database queries for optimization and security"
"Analyze table relationships for data integrity issues"
```

## 🚨 Emergency Security Reviews

### **Before Deployment**
```
"Emergency security review: Check all changes since [DATE] for critical vulnerabilities"
"Pre-deployment audit: Review [FEATURE] for production-readiness"
"Security sanity check: Verify no hardcoded credentials or API keys"
```

### **After Incident**
```
"Post-incident review: Analyze [MODULE] for similar vulnerabilities"
"Security assessment: Check for related attack vectors"
"Compliance review: Verify all security controls are in place"
```

## 📋 Scenario-Based Prompts

### **New Feature Integration**
```
"Review the new [FEATURE] for:
1. Security vulnerabilities (OWASP Top 10)
2. Performance impact on existing system
3. Integration points with authentication/authorization
4. Data validation and sanitization
5. Error handling and logging"
```

### **Third-Party Integration**
```
"Security review of [INTEGRATION]:
- API key and credential management
- Data transmission security
- Third-party dependency vulnerabilities
- Rate limiting and abuse prevention
- Error handling and fallback mechanisms"
```

### **Payment Processing**
```
"PCI-DSS compliance review of payment processing:
- Card data handling and storage
- Encryption implementation
- API security and authentication
- Logging and monitoring practices
- Error message information leakage"
```

## 🔧 Quick Fixes Verification

```
"Verify the security fix for [VULNERABILITY] is properly implemented"
"Review the refactored code for new security issues"
"Check if the performance optimization introduced any vulnerabilities"
"Validate that the authentication fix doesn't break legitimate flows"
```

## 📊 Compliance & Standards

```
"GDPR compliance review: User data handling and consent management"
"OWASP ASVS compliance audit: Authentication and session management"
"PCI-DSS assessment: Payment card data handling"
"SOC 2 preparation: Security controls and logging practices"
```

## 💡 Pro Tips

### **Better Results**
1. **Specify files**: "Review app/Http/Controllers/Auth/*" instead of "Review auth"
2. **Set context**: "This is a public-facing API" vs "Internal admin tool"
3. **Define threats**: "Focus on XSS and CSRF" vs "General security review"
4. **Mention compliance**: "GDPR compliance" vs "Data protection"

### **Common Mistakes**
❌ "Review this" (too vague)
❌ "Check for bugs" (not specific enough)
❌ "Make it secure" (doesn't help reviewer focus)

✅ "Review LoginController.php for authentication bypass and session fixation"
✅ "Check React form components for XSS vulnerabilities in user input"
✅ "Audit API endpoints for rate limiting and abuse prevention"

---

## 🎯 Ready-to-Use Templates

### **Basic Security Review**
```
"Review [FILE/FOLDER] for security vulnerabilities with focus on:
- Authentication and authorization issues
- Input validation and sanitization
- SQL injection and XSS prevention
- Sensitive data exposure
- Error message information leakage"

Context: [BRIEF DESCRIPTION]
```

### **Performance + Security**
```
"Comprehensive review of [FEATURE]:
Security: OWASP Top 10, authentication, authorization
Performance: Database queries, memory usage, response times
Code Quality: Maintainability, test coverage, error handling"

Impact: [HIGH/MEDIUM/LOW] priority system
```

### **Emergency Deployment Check**
```
"URGENT: Pre-deployment security review of [CHANGES]
Check for:
- Critical vulnerabilities (SQLi, XSS, auth bypass)
- Hardcoded credentials or API keys
- Configuration issues
- Performance regressions
- Breaking changes"

Deploying in: [TIME HOURS]
```

---

## 🚀 Quick Start

**For immediate use, copy and paste these templates:**

### **Quick Security Check**
```
"Review [FOLDER/FILE] for OWASP Top 10 vulnerabilities"
```

### **Comprehensive Audit**
```
"Full security audit of [FEATURE] including authentication, authorization, data protection, and error handling"
```

### **Performance + Security**
```
"Review [CODE] for security vulnerabilities and performance optimization opportunities"
```

---

**Remember**: The more specific your prompt, the better the review results!