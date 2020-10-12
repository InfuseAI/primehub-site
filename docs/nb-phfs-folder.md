---
id: nb-phfs-folder
title: PHFS Storage
---

>PHFS Storage requires [PrimeHub Store](design/primehub-store) feature enabled.

When PrimeHub is configured with the enabled **PrimeHub Store**. There is a folder `phfs` mounting in user's Notebook automatically. The folder, actually, is a storage shared among the members of the group via [PrimeHub File System (PHFS)](design/phfs).

The PHFS Storage in Notebook is just a initial stage of PHFS. So far users are able to store files in the `/phfs` (via Notebook, Job artifacts) and share them with other group members, it seems similar to **Group Volume**, however, there are [differences between PHFS and Group Volume](design/phfs#comparing-to-group-volume). In addition, because the limitations of PHFS, no quota control over PHFS storage and performance, we don't recommend to store datasets or other performance-sensitive data in `/phfs`/, please use Group Volume instead.

In near future, PrimeHub will provides more features based on PHFS.
