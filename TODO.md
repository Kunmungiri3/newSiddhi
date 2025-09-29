# Implement Cloudinary for CV Storage

## Overview
Switch CV uploads from local storage (public/uploads/) to Cloudinary to reduce server size. Store only the Cloudinary URL in MongoDB's Jobseeker.cv field. Assumes Cloudinary credentials are added to .env: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.

## Steps
1. [x] Create utils/cloudinary.js: Add Cloudinary configuration and an async upload function that handles file buffers (using streamifier for multer memory storage).
2. [x] Update routes/jobseeker.js: Change multer storage from diskStorage to memoryStorage (to get buffer instead of saving locally). Keep file limits.
3. [x] Update controller/jobseekerController.js: In saveJobseeker, if req.file exists, use uploadToCloudinary on req.file.buffer to get URL, store in jobseeker.cv. Handle errors (set cv: null if upload fails). No changes to listJobseekers.
4. [x] Update server.js: Comment out the /uploads static serving line (keep for legacy local files if any; new uploads won't use it).
5. [x] Read views/listjobseekers.ejs: Check CV display/download links. Update if hardcoded for local paths (e.g., ensure <a href="<%= jobseeker.cv %>"> works with absolute URLs). No changes needed; links use absolute URLs directly.
6. [x] Test: Run `npm start`, register a new jobseeker with a CV file, verify upload succeeds (check console/DB for URL), test download from list view. Clean up any local test files.

## Notes
- No changes to models/jobseeker.js (cv field remains String for URL/path).
- Vendors have no file uploads, so no changes there.
- If upload fails (e.g., missing .env vars), console.error will log; CV will be null.
- After implementation, optionally migrate existing local CVs to Cloudinary via a one-time script.
