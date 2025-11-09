# Power-BI-Nexus

A static documentation site built with [Zensical](https://zensical.org/).

## Getting Started

### Prerequisites

- Docker (for devcontainer)
- Or Python 3.x with pip

### Development with Devcontainer

1. Open this project in VS Code
2. When prompted, click "Reopen in Container" (or use Command Palette: "Dev Containers: Reopen in Container")
3. Wait for the container to build and dependencies to install

### Initialize Your Site

Once in the devcontainer, create your Zensical site:

```bash
zensical new .
```

This creates:
- `docs/` - Your documentation content (Markdown files)
- `zensical.toml` - Configuration file

### Preview Your Site

Start the development server:

```bash
zensical serve
```

Then open your browser to http://localhost:8000

The site will automatically rebuild when you make changes to your documentation.

### Build Your Site

To build the static site for deployment:

```bash
zensical build
```

The static site will be generated in the `site/` directory.

## Configuration

Edit `zensical.toml` to customize your site. At minimum, you should set:

```toml
[project]
site_name = "Your Site Name"
site_url = "https://your-domain.com"
```

### Git Contributors Setup

The site displays contributor avatars at the bottom of each page using the `mkdocs-git-committers-plugin-2`. To enable GitHub avatars and links:

1. **Create a GitHub Personal Access Token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate a new token with `public_repo` scope (or `repo` for private repos)
   - Copy the token

2. **Set the token as an environment variable:**
   
   **In the devcontainer (Linux):**
   ```bash
   export MKDOCS_GIT_COMMITTERS_APIKEY=your_github_token_here
   ```
   
   **On Windows (PowerShell):**
   ```powershell
   $env:MKDOCS_GIT_COMMITTERS_APIKEY="your_github_token_here"
   ```
   
   **For persistent setup, add to your shell profile:**
   - Linux/Mac: Add to `~/.bashrc` or `~/.zshrc`
   - Windows: Set as a system environment variable

3. **Without the token:** The plugin will still work but will be rate-limited by GitHub's API and won't show contributor avatars.

The contributors section appears automatically at the bottom of each page, showing circular avatars with GitHub usernames and links.

## Documentation

- [Zensical Documentation](https://zensical.org/docs/)
- [Create Your Site](https://zensical.org/docs/create-your-site/)
- [Customization](https://zensical.org/docs/customization/)
- [Publishing](https://zensical.org/docs/publish-your-site/)

## License

See [LICENSE](LICENSE) file for details.
