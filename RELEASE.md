# Release Best Practices and Workflow

This project uses **Changesets** and **GitHub Actions** to automate the release process, following Semantic Versioning (SemVer).

## 1. Development Workflow (Adding Changes)

When you make changes to the codebase, you must include a "changeset" to declare how the versions should be bumped.

1.  **Make Changes**: Modify the code as needed.
2.  **Create Changeset**: Run the interactive command:
    ```bash
    npm run changeset
    ```
    - Select the packages you modified.
    - Select the bump type (Major, Minor, or Patch).
    - Enter a summary of the changes.
3.  **Commit**: Commit the `.changeset/*.md` file along with your code changes.
4.  **Push & PR**: Push to a branch and create a Pull Request.
5.  **Merge**: Once tests pass and code is reviewed, merge the PR into `main`.

## 2. Automated Release Workflow

Once changes are merged into `main`, the CI/CD pipeline handles the rest:

1.  **Version Packages PR**: The **Release** GitHub Action detects new changesets and creates a Pull Request titled "Version Packages".
    - This PR updates `package.json` versions.
    - It updates `CHANGELOG.md` files.
    - It deletes the used changeset files.
2.  **Publish**:
    - Review the "Version Packages" PR.
    - **Merge** the "Version Packages" PR into `main`.
    - The **Release** GitHub Action runs again, detects the version bump, builds the project, and automatically **publishes to NPM**.

## 3. Prerequisties

- **Secrets**: Ensure `NPM_TOKEN` is added to the GitHub Repository Secrets.
- **Tests**: `npm test` should pass.
- **Build**: `npm run build` should succeed.

## 4. Skipping Release

If you need to merge changes to `main` without triggering the release workflow (e.g., CI-only changes, documentation updates, or internal refactors that shouldn't trigger a publish or PR creation), you can skip the release job.

1.  **Add Skip Flag**: Include `[skip release]` in your merge commit message.
2.  **Effect**: The "Release" GitHub Action will be skipped.

To manually trigger a release later (e.g., if you skipped it), go to the "Actions" tab in GitHub, select the "Release" workflow, and click "Run workflow".
