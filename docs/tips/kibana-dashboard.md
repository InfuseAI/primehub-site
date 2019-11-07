---
id: kibana-dashboard
title: Kibana Import / Export
---

## How to use
To export kibana dashboard settings from current cluster:

```
cd modules/kibana-dashboard
./export-kibana-dashboard.sh
```

The exported json files will be in `kibana-dashboards/` folder.

To import kibana dashboard settings from `kibana-dashboards/` folder:

```
./import-kibana-dashboard.sh
```

## Reference

- https://www.elastic.co/guide/en/kibana/current/dashboard-import-api-import.html
- https://www.elastic.co/guide/en/kibana/current/dashboard-import-api-export.html
- https://www.elastic.co/guide/en/kibana/current/saved-objects-api-find.html
- https://www.elastic.co/guide/en/kibana/current/saved-objects-api-bulk-create.html
