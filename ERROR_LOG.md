# Empress Health MVP - Error Log

## Introduction

This document provides a comprehensive log of the errors encountered during the development of the Empress Health MVP. Each entry includes a description of the error, the steps taken to resolve it, and the final resolution.

## Error Log

### 1. Vercel Build Error: Event handlers cannot be passed to Client Component props

*   **Date:** 2025-08-18
*   **Description:** The Vercel build was failing with the error `Error: Event handlers cannot be passed to Client Component props`. This was caused by an `onClick` handler being passed to a Client Component from a Server Component.
*   **Resolution:** The interactive portion of the code was extracted into a separate Client Component, and the `onClick` handler was moved to the new component.

### 2. Vercel Build Error: ENOENT: no such file or directory, open '/vercel/path1/package.json'

*   **Date:** 2025-08-18
*   **Description:** The Vercel build was failing with the error `ENOENT: no such file or directory, open '/vercel/path1/package.json'`. This was caused by a misconfiguration in the Vercel settings.
*   **Resolution:** A `vercel.json` file was created to explicitly configure the build command and ensure that the `package.json` file was correctly located.

### 3. Vercel Deployment Error: 404: NOT_FOUND

*   **Date:** 2025-08-18
*   **Description:** The Vercel deployment was succeeding, but it was resulting in a 404 error. This was caused by a misconfiguration in the `next.config.ts` file.
*   **Resolution:** The `outputFileTracingRoot` property was removed from the `next.config.ts` file, and the `vercel.json` file was updated to use `package.json` as the build source and add a rewrite rule to ensure all requests were correctly handled by the Next.js application.

### 4. Local Build Error: Processing image failed

*   **Date:** 2025-08-18
*   **Description:** The local build was failing with the error `Processing image failed`. This was caused by a corrupted `favicon.ico` file.
*   **Resolution:** The `favicon.ico` file was deleted.

### 5. npm Install Error: ERESOLVE unable to resolve dependency tree

*   **Date:** 2025-08-18
*   **Description:** The `npm install` command was failing with the error `ERESOLVE unable to resolve dependency tree`. This was caused by a dependency conflict.
*   **Resolution:** The `--legacy-peer-deps` flag was used to instruct npm to ignore the conflict and proceed with the installation.

### 6. Google Cloud SDK Error: Unknown project id

*   **Date:** 2025-08-18
*   **Description:** The `gcloud storage buckets create` command was failing with the error `HTTPError 400: Unknown project id`. This was caused by an incorrect project ID.
*   **Resolution:** A new Google Cloud project was created, and the correct project ID was used.

### 7. Google Cloud SDK Error: The billing account for the owning project is disabled in state absent

*   **Date:** 2025-08-18
*   **Description:** The `gcloud storage buckets create` command was failing with the error `HTTPError 403: The billing account for the owning project is disabled in state absent`. This was caused by a disabled billing account.
*   **Resolution:** The billing account was enabled.

### 8. Google Cloud SDK Error: INVALID_ARGUMENT: Request contains an invalid argument

*   **Date:** 2025-08-18
*   **Description:** The `gcloud billing projects link` command was failing with the error `INVALID_ARGUMENT: Request contains an invalid argument`. This was caused by an incorrect billing account ID.
*   **Resolution:** The correct billing account ID was used.

### 9. Google Cloud SDK Error: roles/storage.objectViewer is not a valid role for projects/_/buckets/empress-health-images/objects/personalized-coaching.jpg#0

*   **Date:** 2025-08-18
*   **Description:** The `gcloud storage objects add-iam-policy-binding` command was failing with the error `HTTPError 400: roles/storage.objectViewer is not a valid role for projects/_/buckets/empress-health-images/objects/personalized-coaching.jpg#0`. This was caused by an incorrect role.
*   **Resolution:** The `roles/storage.legacyObjectOwner` role was used instead.

### 10. Git Push Error: push declined due to repository rule violations

*   **Date:** 2025-08-18
*   **Description:** The `git push` command was failing with the error `push declined due to repository rule violations`. This was caused by a secret being committed to the repository.
*   **Resolution:** The secret was removed from the commit history, and the file containing the secret was added to the `.gitignore` file.

### 11. Git Push Error: non-fast-forward

*   **Date:** 2025-08-18
*   **Description:** The `git push` command was failing with the error `non-fast-forward`. This was caused by the local branch being behind the remote branch.
*   **Resolution:** The changes were force pushed to the remote repository.