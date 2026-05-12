#!/usr/bin/env python3
"""Deploy Flixcentral+ to Firebase Hosting"""
import subprocess, os, sys, json

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
print("\n[3/3] Pushing to GitHub...")
run(["git", "add", "-A"], cwd=os.path.dirname(__file__))
run(["git", "commit", "--allow-empty", "-m", "Deploy update"], cwd=os.path.dirname(__file__))
run(["git", "push"], cwd=os.path.dirname(__file__))

print("\n✅ Deploy complete!")
print("   GitHub Pages: https://publicityvisual.github.io/flixcentralplus/")
print("   Firebase:     https://flixcentralplus-33dc5.web.app")
