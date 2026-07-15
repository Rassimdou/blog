#!/usr/bin/env python3
"""
App-ID sweep using the confirmed oracle:
  - 503 with server: awselb/2.0, no Oracle headers -> app ID not routed at edge
  - 200 (or any response WITH Oracle/APEX headers, even a 404 app page)
    -> app ID exists at origin, worth a closer look

Paced deliberately slow (3s between requests) after the earlier burst
looked like it might have tripped rate-limiting. Adjust SLEEP_SECONDS
up if you see 503s creeping back in on IDs you already confirmed exist.
"""
import requests
import urllib3
import time

urllib3.disable_warnings()

BASE = "https://jcitempprod01.japfacomfeed.co.id/ords/feed1/f?p="
UA = "Mozilla/5.0" + " -BugBounty-pt-japfa-comfeed-indonesia-tbk.-31337 "
HEADERS = {"User-Agent": UA}
SLEEP_SECONDS = 3

# Confirmed: 10000 exists (ORDER-PAKAN), 10001 does not (edge 503).
# Sweep a modest range plus common APEX system app IDs.
CANDIDATES = list(range(9990, 10010)) + [100, 101, 4000, 4020, 4050, 4350, 4400, 4500, 4550]

def check(app_id):
    url = f"{BASE}{app_id}:LOGIN"
    try:
        resp = requests.get(url, headers=HEADERS, verify=False, timeout=15, allow_redirects=False)
        server = resp.headers.get("server", "")
        has_oracle_headers = "content-security-policy" in resp.headers or "x-frame-options" in resp.headers
        edge_reject = (resp.status_code == 503 and "awselb" in server.lower() and not has_oracle_headers)

        if edge_reject:
            verdict = "NOT ROUTED (edge 503)"
        elif has_oracle_headers:
            verdict = f"EXISTS AT ORIGIN (status={resp.status_code})"
        else:
            verdict = f"UNCLEAR (status={resp.status_code}, server={server!r})"

        print(f"  app_id={app_id:6d}  {verdict}")
        return app_id, verdict
    except Exception as e:
        print(f"  app_id={app_id:6d}  ERROR: {e}")
        return app_id, "ERROR"
    finally:
        time.sleep(SLEEP_SECONDS)

print(f"Sweeping {len(CANDIDATES)} app IDs, {SLEEP_SECONDS}s apart (this will take a few minutes)...")
print()

results = []
for app_id in CANDIDATES:
    results.append(check(app_id))

print()
print("=" * 60)
print("SUMMARY -- app IDs that exist at origin:")
print("=" * 60)
for app_id, verdict in results:
    if "EXISTS" in verdict:
        print(f"  {app_id}: {verdict}")