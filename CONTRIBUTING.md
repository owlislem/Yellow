# Contributing to Yellow Family

Thank you for your interest in contributing to Yellow Family! This document provides guidelines for contributing to the project.

## 🎯 Project Goals

Yellow Family is a portfolio project demonstrating full-stack web development capabilities. Contributions that enhance the project's educational value or improve code quality are welcome.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:

- **Clear title** describing the problem
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, Node version, browser)

### Suggesting Enhancements

Feature requests are welcome! Please open an issue describing:

- **Use case**: Why this feature would be valuable
- **Proposed solution**: How you envision it working
- **Alternatives**: Other approaches you've considered

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the code style guidelines
4. **Test your changes** thoroughly
5. **Commit** with clear, descriptive messages:
   ```bash
   git commit -m "Add: brief description of changes"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** with a clear description

## 📝 Code Style Guidelines

### JavaScript/React

- Use **ES6+** syntax
- Follow **functional component** patterns in React
- Use **meaningful variable names**
- Add **comments** for complex logic
- Keep functions **small and focused**

### Formatting

- Use **2 spaces** for indentation
- Add **semicolons** where appropriate
- Use **single quotes** for strings (unless template literals)
- Keep lines under **100 characters** when possible

### Naming Conventions

- **Components**: PascalCase (`UserProfile.jsx`)
- **Functions**: camelCase (`getUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Files**: kebab-case for utilities, PascalCase for components

## 🧪 Testing

- Test your changes manually before submitting
- Ensure the application builds without errors
- Check for console errors in the browser
- Verify responsive design on mobile devices

## 📁 Project Structure

```
yellow-family/
├── backend/           # Express API
│   ├── controllers/   # Route handlers
│   ├── models/        # Database schemas
│   ├── routes/        # API routes
│   └── utils/         # Helper functions
│
└── frontend/          # React application
    └── src/
        ├── components/  # Reusable components
        ├── pages/       # Page components
        ├── features/    # Redux slices
        └── app/         # Redux store
```

## 🔍 What We're Looking For

### Priority Contributions

- **Bug fixes** with clear reproduction steps
- **Code quality improvements** (refactoring, better patterns)
- **Documentation improvements** (typos, clarity, examples)
- **Security enhancements**
- **Performance optimizations**
- **Accessibility improvements**

### Not Currently Accepting

- Major architectural changes without prior discussion
- Features that significantly increase complexity
- Changes that break existing functionality

## 💬 Communication

- **Issues**: For bug reports and feature requests
- **Pull Requests**: For code contributions
- **Discussions**: For questions and general conversation

## ⚖️ Code of Conduct

### Our Standards

- **Be respectful** of differing viewpoints
- **Be constructive** in feedback
- **Focus on what's best** for the project
- **Show empathy** towards other contributors

### Unacceptable Behavior

- Harassment or discriminatory language
- Personal attacks or trolling
- Publishing others' private information
- Any conduct inappropriate in a professional setting

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

All contributors will be recognized in the project. Thank you for helping improve Yellow Family!

---

## Questions?

Feel free to open an issue for any questions about contributing.
