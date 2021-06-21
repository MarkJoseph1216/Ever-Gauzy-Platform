# Ever Gauzy Platform

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/ever-co/ever-gauzy)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/gauzy)
[![Gitter](https://badges.gitter.im/JoinChat.svg)](https://gitter.im/ever-co/ever-gauzy?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/evereq?utm_source=github&utm_medium=button&utm_term=evereq&utm_campaign=github)

Ever® Gauzy™ - **Open-Source Business Management Platform** for On-Demand and Sharing Economies.

Ever® Gauzy™ Platform is an: 
- **Enterprise Resource Planning** (ERP) software
- **Customer Relationship Management** (CRM) software
- **Human Resource Management** (HRM) software with employee **Time and Activity Tracking** functionality

![overview](https://gauzy.co/wp-content/themes/gauzy/assets/img/home/home-1.png)

You are welcome to check more information about the platform at our official website - **<https://gauzy.co>**. 

Ever® Gauzy™ Platform is a part of our larger Open Platform for **On-Demand and Sharing Economies**.  
You can get more information about our products at **<https://ever.co>**.

Ever® Gauzy™ Platform main features:

-   Human Resources Management (HRM) with Time Management / Tracking and Employees Performance Monitoring
-   Customer Relationship Management (CRM)
-   Enterprise Resource Planning (ERP)
-   Projects / Tasks Management
-   Sales Management
-   Financial and Cost Management (including _Accounting_, _Invoicing_, etc)
-   Inventory, Supply Chain Management and Production Management

More detailed list of the features available in the platform:

-   Dashboard (provides overview of different metrics, such as company income / expenses, employees bonuses, etc.)
-   Time Management / Time Tracking / Activity Tracking / Timesheets
-   Employees Management (register of company employees / contractors, rates of employees, etc.)
-   Employees Onboarding / Candidates Interviews
-   Contacts Management (Clients / Customers / Leads / etc.)
-   Schedules / Appointments / Events
-   Project Management / Tasks
-   Goals / KPI / Objectives / Key Results
-   Sales Pipelines
-   Proposals
-   Accounting / Invoicing / Estimates
-   Billing
-   Payments
-   Income / Expenses Management
-   Time Off Management / Holidays / Approvals
-   Inventory
-   Equipment / Sharing
-   Organization Departments and Teams
-   Organization Clients and Vendors
-   Help Center / Knowledge Base
-   Multiple Organizations Management
-   Tags / Labels
-   Reports
-   Organization and Employee Public Pages
-   Integrations (Upwork, HubStaff, etc.)
-   Email History / Email Templates
-   Data Import / Export
-   Roles / Permissions
-   Multi-currency
-   Multi-language
-   Dark / Light / Corporate and other Themes

Read more [About Gauzy](https://github.com/ever-co/ever-gauzy/wiki/About-Gauzy) and [How to use it](https://github.com/ever-co/ever-gauzy/wiki/How-to-use-Gauzy) at your company, on-demand business, freelance business, agency, studio or in-house teams.

## Demo, Testing and Production

### Demo

-   Gauzy Platform Demo at <https://demo.gauzy.co> (login `admin@ever.co` and password: `admin`).
-   You can also download and try our Desktop Apps (Windows/Mac/Linux) from <https://github.com/ever-co/ever-gauzy/releases> (see more information about Desktop Apps below).

### Production (SaaS, WIP)

-   Ever® Gauzy™ Platform SaaS at <https://app.gauzy.co> (not used yet in production / in testing mode and it's the same as <https://demo.gauzy.co> for now)

### Dev Builds

-   Gauzy Platform Dev builds (using CI/CD, from the `develop` branch) will be available later at <https://app.gauzy.dev>

### Desktop Apps

We have 2 Desktop Apps (for Windows/Mac/Linux): 

-   Ever® Gauzy™ Desktop App - includes Gauzy frontend (UI), Gauzy API, SQLite DB, etc., all-in-one! It allows to quickly run the whole Gauzy solution locally, both UI and Timer (for time tracking, optionally of course). In addition, it allows to connect to the external database (e.g. PostgreSQL) or external API (if you have Gauzy API / DB installed on different computer or if you want to connect to our live API). 
 
-   Ever® Gauzy™ Desktop Timer App - allows to run Time & Activity Tracking for employees (agent) with screenshots and activity monitoring.

More information about our Desktop Apps:

-   Download for your OS from <https://github.com/ever-co/ever-gauzy/releases>.
-   Setup Gauzy Desktop App or Gauzy Desktop Timer app with default choices in Setup Wizard and run it-   
-   You can login with `admin@ever.co` and password `admin` to check Admin functionality if you installed Gauzy Desktop App. Note: such Admin user is not an employee, so you will not be able to track time.
-   You can login with `employee@ever.co` and password `123456` to check Employee related functionality in Gauzy UI or to run Desktop Timer from "Employee" perspective (such user is an Employee and can track time).
-   You can read more information about our Desktop Apps in the [Wiki](https://github.com/ever-co/ever-gauzy/wiki/Gauzy-Desktop-Apps)

## Technology Stack and Requirements

-   [TypeScript](https://www.typescriptlang.org) language
-   [NodeJs](https://nodejs.org) / [NestJs](https://github.com/nestjs/nest)
-   [Nx](https://nx.dev)
-   [Angular](https://angular.io)
-   [RxJS](http://reactivex.io/rxjs)
-   [TypeORM](https://github.com/typeorm/typeorm)
-   [Ngx-admin](https://github.com/akveo/ngx-admin)

For Production, we recommend:

-   [PostgreSQL](https://www.postgresql.org)
-   [PM2](https://github.com/Unitech/pm2)

Note: thanks to TypeORM, Gauzy will support lots of DBs: SQLite (default, for demos), PostgreSQL (development/production), MySql, MariaDb, CockroachDb, MS SQL, Oracle, MongoDb and others, with minimal changes.

#### See also README.md and CREDITS.md files in relevant folders for lists of libraries and software included in the Platform, information about licenses and other details.

## Documentation

Please refer to our official [Platform Documentation](https://docs.gauzy.co) and to our [Wiki](https://github.com/ever-co/ever-gauzy/wiki) (WIP).

## Quick Start

### With Docker Compose

-   Clone repo
-   Make sure you have Docker Compose [installed locally](https://docs.docker.com/compose/install)
-   Run `docker-compose -f docker-compose.demo.yml up`, if you want to run the platform using our prebuild Docker images _(note: it uses latest images pre-build automatically from head of `master` branch using Github CI/CD)_
-   Run `docker-compose up`, if you want to build everything (code and Docker images) locally. _(note: this is extremely long process, option above is much faster)_
-   :coffee: time...
-   Open <http://localhost:4200> in your browser
-   Login with email `admin@ever.co` and password: `admin` for Super Admin user
-   Login with email `ruslan@ever.co` and password: `123456` for Employee user
-   Enjoy

Note: together with Gauzy, Docker Compose will run following:

-   Cross-platform client for PostgreSQL DBs [pgweb](https://github.com/sosedoff/pgweb), on <http://localhost:8081>
-   [Franchise](https://github.com/HVF/franchise), lightweight but powerful SQL tool with a notebook interface, on <http://localhost:8082>
-   [OmniDb](https://github.com/OmniDB/OmniDB), on <http://localhost:8083> and using default credentials (admin:admin) configure connection string `postgres://postgres:root@db:5432/postgres?sslmode=disable`.
-   [Adminer](https://www.adminer.org) Database management in a single PHP file, on <http://localhost:8084>

### Manually

-   Install [NodeJs](https://nodejs.org/en/download) LTS version, e.g. 14.x (note: at the moment Gauzy may not work with Node 15.x)
-   Optionally install and run [PostgreSQL](https://www.postgresql.org) version 11 or 12 (note: version 13 is not supported yet). Note: other DB can be configured manually in TypeORM. The default DB is set to SQLite for demo purposes.
-   Install [Yarn](https://github.com/yarnpkg/yarn) (if you don't have it) with `npm i -g yarn`
-   Install NPM packages and boostrap solution using command `yarn bootstrap`
-   Copy [`.env.sample`](https://github.com/ever-co/ever-gauzy/blob/develop/.env.sample) to `.env` and optionaly change default settings, e.g. database type, name, user, password, etc.
-   Optionally, if you want to seed a lot of fake data for demo testing, run `yarn seed:all`
-   Run both API and UI with single command: `yarn start`
-   Open Gauzy UI on <http://localhost:4200> in your browser (API runs on <http://localhost:3000/api>)
-   Login with email `admin@ever.co` and password: `admin`
-   Enjoy

Notes:

-   during the first API start, DB will be automatically seed with minimum set of initial data if no users found.
-   you can run seed any moment manually (e.g. if you changed entities schemas) with `yarn seed` command to re-initialize DB (warning: unsafe for production!).
-   it is possible to run generation of extremely large amount of fake data for demo purposes / testing with `yarn seed:all` (warning: takes ~10 min to complete)

### Production

-   Check [Gauzy Pulumi](https://github.com/ever-co/ever-gauzy-pulumi) project, it makes Clouds deployments possible with a single command (`pulumi up`)

Note: it currently supports AWS EKS (Kubernetes) for development and production (recommended) with Application Load Balancers and AWS RDS Serverless PostgreSQL DB deployments. In addition, we implemented deployments to ECS EC2 and Fargate Clusters.

## Contribute

-   Please give us :star: on Github, it **helps**!
-   You are more than welcome to submit feature requests in the [separate repo](https://github.com/ever-co/feature-requests/issues)
-   Pull requests are always welcome! Please base pull requests against the _develop_ branch and follow the [contributing guide](.github/CONTRIBUTING.md).

## Contributors

View full list of our [contributors](https://github.com/ever-co/ever-gauzy/graphs/contributors).

## Contact Us

-   [Ever.co Website Contact Us page](https://ever.co/contacts)
-   [Slack Community](https://join.slack.com/t/gauzy/shared_invite/enQtNzc5MTA5MDUwODg2LTI0MGEwYTlmNWFlNzQzMzBlOWExNTk0NzAyY2IwYWYwMzZjMTliYjMwNDI3NTJmYmM4MDQ4NDliMDNiNDY1NWU)
-   [Discord Chat](https://discord.gg/hKQfn4j)
-   [Spectrum Community](https://spectrum.chat/gauzy)
-   [Gitter Chat](https://gitter.im/ever-co/gauzy)
-   [CodeMentor](https://www.codementor.io/evereq)
-   For business inquiries: <mailto:gauzy@ever.co>
-   Please report security vulnerabilities to <mailto:security@ever.co>
-   [Gauzy Platform @ Twitter](https://twitter.com/gauzyplatform)
-   [Gauzy Platform @ Facebook](https://www.facebook.com/gauzyplatform)

## Security

Gauzy™ follows good security practices, but 100% security cannot be guaranteed in any software!  
Gauzy™ is provided AS IS without any warranty. Use at your own risk!  
See more details in the [LICENSE](LICENSE).

In a production setup, all client-side to server-side (backend, APIs) communications should be encrypted using HTTPS/WSS/SSL (REST APIs, GraphQL endpoint, Socket.io WebSockets, etc.).

If you discover any issue regarding security, please disclose the information responsibly by sending an email to <mailto:security@ever.co> or on  [![huntr](https://cdn.huntr.dev/huntr_security_badge_mono.svg)](https://huntr.dev) and not by creating a GitHub issue.

## License

This software is available under following licenses:

-   [Ever® Gauzy™ Platform Community Edition](https://github.com/ever-co/ever-gauzy/blob/master/LICENSE.md#gauzy-platform-community-edition-license)
-   [Ever® Gauzy™ Platform Small Business](https://github.com/ever-co/ever-gauzy/blob/master/LICENSE.md#gauzy-platform-small-business-license)
-   [Ever® Gauzy™ Platform Enterprise](https://github.com/ever-co/ever-gauzy/blob/master/LICENSE.md#gauzy-platform-enterprise-license)

#### The default Ever® Gauzy™ Platform license, without a valid Ever® Gauzy™ Platform Enterprise or Ever® Gauzy™ Platform Small Business License agreement, is the Ever® Gauzy™ Platform Community Edition License.

#### Please see [LICENSE.md](LICENSE.md) for more information on licenses. You can also [compare our offering](https://ever.co/compare-gauzy/#compare).

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fever-co%2Fgauzy.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fever-co%2Fgauzy?ref=badge_large)

## Trademarks

**Ever**® is a registered trademark of [Ever Co. LTD](https://ever.co).  
**Ever® Demand™**, **Ever® Gauzy™** and **Ever® OpenSaaS™**  are all trademarks of [Ever Co. LTD](https://ever.co).

The trademarks may only be used with the written permission of Ever Co. LTD. and may not be used to promote or otherwise market competitive products or services.

All other brand and product names are trademarks, registered trademarks or service marks of their respective holders.

## Copyright

#### Copyright © 2019-present, Ever Co. LTD. All rights reserved.

![visitors](https://visitor-badge.laobi.icu/badge?page_id=ever-co.gauzy-platform)
[![huntr](https://cdn.huntr.dev/huntr_security_badge_mono.svg)](https://huntr.dev)
[![Circle CI](https://circleci.com/gh/ever-co/ever-gauzy.svg?style=svg)](https://circleci.com/gh/ever-co/ever-gauzy)
[![codecov](https://codecov.io/gh/ever-co/ever-gauzy/branch/master/graph/badge.svg)](https://codecov.io/gh/ever-co/ever-gauzy)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8e0f1c13c3d94f18b1523b896d4500aa)](https://www.codacy.com/manual/Ever/ever-gauzy?utm_source=github.com&utm_medium=referral&utm_content=ever-co/ever-gauzy&utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3293/projects/16703/branches/363423/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3293&pid=16703&bid=363423)
[![Known Vulnerabilities](https://snyk.io/test/github/ever-co/ever-gauzy/badge.svg)](https://snyk.io/test/github/ever-co/ever-gauzy)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/ever-co/ever-gauzy.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/ever-co/ever-gauzy/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/ever-co/ever-gauzy.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/ever-co/ever-gauzy/context:javascript)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fever-co%2Fever-gauzy.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fever-co%2Fgauzy?ref=badge_shield)
[![Crowdin](https://badges.crowdin.net/e/1d2b3405d65a56ec116d0984fd579cc9/localized.svg)](https://ever.crowdin.com/gauzy)

## P.S.

-   If you interested to run on-demand (delivery) or digital marketplace business, check open-source [Ever Demand Platform](https://github.com/ever-co/ever-demand)
-   [We are Hiring: remote TypeScript / NestJS / Angular developers](https://github.com/ever-co/jobs#available-positions)
