# 🔧 Gemini API Setup Guide

## Issue

You're getting this error:

```
❌ Failed to compose tile relaxed: Error: Gemini API not configured. Please check your API key.
```

## Solution

The `VITE_GEMINIKEY` environment variable is not set up. Here's how to fix it:

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Create Environment File

Create a `.env` file in your project root with the following content:

```bash
# Gemini API Configuration
VITE_GEMINIKEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with the API key you copied from Google AI Studio.

### Step 3: Restart Your Development Server

After creating the `.env` file, restart your development server:

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
# or
yarn dev
```

### Step 4: Verify the Fix

The error should disappear and your Gemini API calls should work properly.

## Additional Notes

- The `.env` file is already in your `.gitignore`, so it won't be committed to version control
- Make sure there are no spaces around the `=` sign in your `.env` file
- The API key should start with something like `AIza...`

## Troubleshooting

If you're still getting errors after following these steps:

1. Check that your `.env` file is in the project root (same level as `package.json`)
2. Verify the API key is correct and active
3. Make sure you restarted your development server
4. Check the browser console for any additional error messages

## Security Note

Never share your API key publicly or commit it to version control. The `.env` file is already configured to be ignored by git.
