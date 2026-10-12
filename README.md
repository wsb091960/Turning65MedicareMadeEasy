# Turning 65 Medicare Made Easy

Responsive Medicare education website with four plan tabs and three nested tabs per plan. Includes FAQs and a downloadable preparation checklist.

## Publish from GitHub to Render

1. Create a GitHub repository named `Turning65MedicareMadeEasy`.
2. Upload the CONTENTS of this folder to the repository root, keeping the `dist` folder intact.
3. In Render choose **New > Blueprint**, connect the repository, and deploy using `render.yaml`.
   Alternatively choose **New > Static Site**, connect the repository, use build command `echo "Static site ready"`, and publish directory `dist`.
4. Wait for the Render URL to load correctly before changing domain DNS. Render automatically adds the www address for the root domain and redirects www to the root address.
5. In Render Settings > Custom Domains, confirm `turning65medicaremadeeasy.com` and `www.turning65medicaremadeeasy.com` are listed; add them if using manual Static Site setup.
6. In GoDaddy DNS, use the exact records shown by Render. The current Render documentation gives the following pattern:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 216.24.57.1 (confirm with Render at setup time) |
| CNAME | www | Your actual Render hostname, without https:// or a path |

Do not assume the requested Render service name is the final hostname. Copy its actual hostname from the dashboard. Replace conflicting web records and remove conflicting AAAA records for the hostnames being connected. Preserve email MX, SPF, DKIM, and DMARC records. If DNS is managed elsewhere, make these changes at the authoritative DNS provider.

7. Click Verify in Render. Render provisions HTTPS after verification. Check both the root and www addresses.

Future pushes to the connected deployment branch can automatically update the website.

## Current functionality

The checklist runs locally in the visitor's browser. It does not collect or submit leads, book appointments, or enroll visitors. Business contact information and a real consultation/contact service can be added later.

## Preview locally

Run `python -m http.server 8000 --directory dist` and open http://localhost:8000.

## Official references

- https://render.com/docs/static-sites
- https://render.com/docs/blueprint-spec
- https://render.com/docs/custom-domains
- https://render.com/docs/configure-other-dns
