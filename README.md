# IRC Frontend

React-based monitoring interface for real-time video processing.

## Local Development

```bash
# Install dependencies
npm install

# Create env file
cp .env.example .env

# Start dev server
npm run dev
```

Open http://localhost:5173

## Configuration

Edit `.env`:
```bash
# Local development
VITE_WS_URL=ws://localhost:8000/ws/process

# Production (your Render backend URL)
VITE_WS_URL=wss://irc-backend.onrender.com/ws/process
```

## Build for Production

```bash
npm run build
```

Output in `dist/` folder.

## Deploy to Render

1. Create new **Static Site**
2. Connect your repo
3. Settings:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist`
4. Add environment variable:
   - `VITE_WS_URL` = `wss://your-backend.onrender.com/ws/process`

## Adding Capsules

Edit `src/config/capsules.js`:

```javascript
{
  id: "new_processor",    // Must match backend processor name
  label: "New Proc",      // Display name
  description: "Info",    // Tooltip
  shortcut: "6",          // Keyboard shortcut
}
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1-5` | Toggle capsules |
| `Space` | Start/Stop |
| `Escape` | Stop all |

## Customization

- **Logo:** Replace `public/logo.png` (recommended: 64x64 PNG)
- **Favicon:** Replace `public/favicon.ico`
- **Colors:** Edit `tailwind.config.js` → `theme.extend.colors.irc`
