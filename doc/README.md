# CFO Insights Conversion Docs

Planning documents for converting your-mom-cfo slides into CFO insights on the UI `/insights` tab.

## Architecture

- [Schema and Jobs](./schema-and-jobs.md) — How jobs run, calendar cache, raw data and calculated value storage
- [Durable Calendar Cache](./calendar-cache-durable.md) — Query and concatenate past events; clear cache when past event is updated

## Insights


| Step | Insight                                                              | Code   | Description                                                                                                   |
| ---- | -------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| 1    | [Current Revenue Status Check](./01-current-revenue-status-check.md) | REV    | Are you on track to hit your annual goal?                                                                     |
| 2    | [Capacity Utilization](./02-capacity-utilization.md)                 | CAP    | Capacity consistency: are you meeting the stated capacity needed to reach your salary goal at your bill rate? |
| 3    | [Context Switching Tax](./03-context-switching-tax.md)               | SWITCH | Too many clients on small engagements = time lost between clients; hurts utility rate.                        |
| 4    | [Work-Life Balance](./04-work-life-balance.md)                       | BAL    | How much work bleeds outside 9–5?                                                                             |
| 5    | [Client Value](./05-client-value.md)                                 | VAL    | Which clients pay the most per hour?                                                                          |
| 6    | [Client Health](./06-client-health.md)                               | HEALTH | Which clients are easiest to work with?                                                                       |
| 7    | [Time Off](./07-time-off.md)                                         | VAC    | Are you taking enough breaks to stay sharp?                                                                   |
| 8    | [Growth Capacity](./08-growth-capacity.md)                           | GROWTH | Do you have room for more clients?                                                                            |
| 9    | [Client Retention](./09-client-retention.md)                         | ENG    | How long do your clients stick around?                                                                        |


## Experimental


| Step | Insight                                                        | Code     | Description                                                                          |
| ---- | -------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| 10   | [Pipeline Maturity](./10-pipeline-maturity.md)                 | PIPELINE | How mature is your pipeline? Do you have enough deals in motion to fill capacity?    |
| 11   | [Marketing & Brand Building](./11-marketing-brand-building.md) | MKTG     | Are you marketing and brand building enough? Steady investment in demand generation? |


