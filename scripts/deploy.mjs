// One-command deploy: builds the app and force-pushes dist/ to the gh-pages branch.
// (The GitHub token in use cannot push workflow files, so we use branch-based Pages.)
import { execSync } from 'node:child_process'
import { rmSync } from 'node:fs'

execSync('npm run build', { stdio: 'inherit' })
rmSync('dist/.git', { recursive: true, force: true })
const cmds = [
  'git init -b gh-pages',
  'git remote add origin https://github.com/RupomYusuf/iba-prep.git',
  'git add -A',
  `git -c user.name="RupomYusuf" -c user.email="RupomYusuf@users.noreply.github.com" commit -m "Deploy: ${new Date().toISOString()}"`,
  'git push -f origin gh-pages',
]
for (const c of cmds) execSync(c, { cwd: 'dist', stdio: 'inherit' })
console.log('\nDeployed → https://rupomyusuf.github.io/iba-prep/')
