#!/usr/bin/env python3
"""Build and deploy Flixcentral+ to Firebase Hosting."""
import subprocess, os, sys

def run(cmd, cwd=None):
    print(f"  → {' '.join(cmd)}")
    r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"  ✖ Error: {r.stderr.strip()}")
        sys.exit(1)
    return r.stdout.strip()

print("="*40)
print(" Flixcentral+ - Deploy")
print("="*40)

# 1. Build
print("\n[1/3] Building...")
run(["npm", "run", "build"], cwd=os.path.dirname(__file__))

# 2. Firebase Deploy
print("\n[2/3] Deploying to Firebase...")
run(["firebase", "deploy", "--only", "hosting"], cwd=os.path.dirname(__file__))

# 3. Git Push
print("\n[3/3] Git push skipped.")
print("      Review changes, then commit and push manually when ready.")

print("\nDeploy complete!")
print("   GitHub Pages: https://publicityvisual.github.io/flixcentralplus/")
print("   Firebase:     https://flixcentralplus-33dc5.web.app")
